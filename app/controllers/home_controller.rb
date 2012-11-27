class HomeController < ApplicationController
  before_filter :authenticate_user!, :only => :token

  def index
    #render :layout => false
  end
end
