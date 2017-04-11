class Api::GsrsController < ApplicationController
  # before_action :require_api_token

  def create
    gsr = Gsr.new(gsr: params['gsr'])
    if gsr.save
      render json: { status: 202, message: 'success' }
    else
      render json: { status: 404, message: gsr.errors.full_messages }
    end
  end

  def index
    gsr = Gsr.last
    render json: { status: 202, message: 'success', data: gsr.gsr }
  end

  private

  def require_api_token
    unless params['api_secret'] && params['api_secret'] == ENV['API_SECRET']
      render json: { status: 404, message: 'invalid api token' }
    end
  end
end
