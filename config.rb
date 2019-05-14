# Settings
set :site_title, "Your cool new site title"
set :site_url, "https://you-cool-valid-url.tld"
set :site_description, "Meta description."
set :site_keywords, "keyword-one, keyword-two"

# Set Directories
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'
set :build_dir, 'dist'

# Remove .html extension from pages
activate :directory_indexes

# Host
configure :build do
  config[:host] = "https://you-cool-valid-url.tld"
end

# Pages
# page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Auto Prefixer
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Robots.txt generator
activate :robots,
  :rules => [
    {
        :user_agent => '*', :allow => %w(/)
    },
    {
      :user_agent => '*',
      :disallow =>  %w(imageoptim.manifest.yml),
    }
  ],
  :sitemap => "https:\/\/you-cool-valid-url.tld\/sitemap.xml"

# External Webpack pipeline
activate :external_pipeline,
         name: :webpack,
         command: build? ?
         "NODE_ENV=production .\/node_modules\/webpack\/bin\/webpack.js --bail -p --progress --color --config build\/webpack.prod.config.js" :
         "NODE_ENV=development .\/node_modules\/webpack\/bin\/webpack.js --watch -d --progress --color --config build\/webpack.dev.config.js",
         source: ".tmp\/dist",
         latency: 1

# Live re-road
configure :development do
    activate :livereload
end

activate :imageoptim do |options|
  # Use a build manifest to prevent re-compressing images between builds
  options.manifest = true
  options.pngout = false

  # Silence problematic image_optim workers
  options.skip_missing_workers = true

  # Cause image_optim to be in shouty-mode
  options.verbose = false

  # Setting these to true or nil will let options determine them (recommended)
  options.nice = true
  options.threads = true

  # Image extensions to attempt to compress
  options.image_extensions = %w(.png .jpg .gif .svg .jpeg)

  # Compressor worker options, individual optimisers can be disabled by passing
  # false instead of a hash
  options.advpng    = { :level => 4 }
  options.gifsicle  = { :interlace => false }
  options.jpegoptim = { :strip => ['all'], :max_quality => 100 }
  options.jpegtran  = { :copy_chunks => false, :progressive => true, :jpegrescan => true }
  options.optipng   = { :level => 6, :interlace => false }
  options.pngcrush  = { :chunks => ['alla'], :fix => false, :brute => false }
  options.svgo      = {}
end

# minify html
activate :minify_html do |html|
  html.remove_multi_spaces        = true   # Remove multiple spaces
  html.remove_comments            = true   # Remove comments
  html.remove_intertag_spaces     = true  # Remove inter-tag spaces
  html.remove_quotes              = false   # Remove quotes
  html.simple_doctype             = false  # Use simple doctype
  html.remove_script_attributes   = true   # Remove script attributes
  html.remove_style_attributes    = false   # Remove style attributes
  html.remove_link_attributes     = false   # Remove link attributes
  html.remove_form_attributes     = false  # Remove form attributes
  html.remove_input_attributes    = false   # Remove input attributes
  html.remove_javascript_protocol = true   # Remove JS protocol
  html.remove_http_protocol       = true  # Remove HTTP protocol
  html.remove_https_protocol      = false  # Remove HTTPS protocol
  html.preserve_line_breaks       = true  # Preserve line breaks
  html.simple_boolean_attributes  = true   # Use simple boolean attributes
  html.preserve_patterns          = nil    # Patterns to preserve
end

# Build
configure :build do

  # Enable cache buster
  activate :cache_buster

  # Use relative URLs
  activate :relative_assets

  # set image path
  set :http_path, "\/assets\/images\/"

  # ignore javascript source as webpack builds this
  ignore 'source\/assets\/javascript\/*.js'
end
