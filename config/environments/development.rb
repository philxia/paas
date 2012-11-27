VP_Revit_API::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  # Raise exception on mass assignment protection for Active Record models
  config.active_record.mass_assignment_sanitizer = :strict

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  config.active_record.auto_explain_threshold_in_seconds = 0.5

  # Do not compress assets
  config.assets.compress = false

  # Expands the lines which load the assets
  config.assets.debug = true

  # Mailer
  #require 'net/smtp'
  #Net.instance_eval {remove_const :SMTPSession} if defined?(Net::SMTPSession)

  #require 'net/pop'
  #Net.instance_eval {remove_const :POP} if defined?(Net::POP)
  #Net.instance_eval {remove_const :POPSession} if defined?(Net::POPSession)
  #Net.instance_eval {remove_const :POP3Session} if defined?(Net::POP3Session)
  #Net.instance_eval {remove_const :APOPSession} if defined?(Net::APOPSession)

  require 'tlsmail'       
  Net::SMTP.enable_tls(OpenSSL::SSL::VERIFY_NONE)   
  ActionMailer::Base.delivery_method = :smtp   
  ActionMailer::Base.perform_deliveries = true   
  ActionMailer::Base.raise_delivery_errors = true   
  ActionMailer::Base.smtp_settings = {   
    enable_starttls_auto: true,     
    address:              'smtp.gmail.com',   
    port:                 587,  
    #tls:                  true, doesn't work in rails 3.2 yet...   
    domain:               'revit-api',    
    domain:               'localhost',    
    authentication:       :plain,   
    user_name:            'vp.revitapi@gmail.com',   
    password:             '123456789098765432`'
  }  
  #config.action_mailer.default_url_options = { :host => '10.148.200.91:3000' }
  config.action_mailer.default_url_options = { :host => 'localhost:3000' }

end
