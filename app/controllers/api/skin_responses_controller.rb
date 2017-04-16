class Api::SkinResponsesController < ApplicationController

  def create
    gsr = SkinResponse.new(gsr: params['gsr'])
    if gsr.save
      render json: { status: 202, message: 'success' }
    else
      render json: { status: 404, message: gsr.errors.full_messages }
    end
  end

  def index
    gsr = SkinResponse.last
    render json: { status: 202, message: 'success', data: gsr.gsr }
  end
end
