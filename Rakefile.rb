# encoding: UTF-8
# frozen_string_literal: true
require 'html-proofer'
raise IOError, 'Directory ./build does not exist. Run `middleman build` before running tests' unless Dir.exists?('./build')

task :test do
  
  HTMLProofer.check_directory('./dist', {
    :check_img_http => true,
    :check_html => false, :validation => { :report_missing_names => true },
    :check_favicon => true,
    :check_opengraph => true,
    :http_status_ignore => [0,999,403,401]
  }).run
end
