# source/sitemap.xml.builder
xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources.each do |resource|
    xml.url do
      xml.loc "#{config.host}#{resource.url}"
    end if resource.url !~ /\.(css|js|eot|svg|woff|woff2|otf|ttf|png|jpg|xml|keep|ico|yml|json|cache|webapp)$/
  end
end
