class BlockCodesController < ApplicationController
  def index
    @block_codes = BlockCodes.find_by_user_id(current_user.id)

    respond_to do |format|
      format.html
      format.json { render :json => @block_codes }
    end
  end
end
