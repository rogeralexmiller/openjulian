class Api::TemperaturesController < ApplicationController
  # before_action :require_api_token

  def create
    temp = Temperature.new(temperature: params[:temperature])
    if temp.save
      render json: {status: 202, message: "success"}
    else
      render json: {status: 404, message: "failure"}
    end
  end

  def index
    temp = Temperature.last
    render json: { status: 202, message: "success", data: temp.temperature }
  end

  private

  def require_api_token
    unless params["api_secret"] && params["api_secret"] == ENV["API_SECRET"]
      render json: {status: 404, message: "invalid api token"}
    end
  end
end
