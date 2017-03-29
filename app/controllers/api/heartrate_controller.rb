class Api::TemperaturesController < ApplicationController
  def create
    heart_rate = HeartRate.new(rate: params["heartrate"])
    if heart_rate.save
      render json: {status: 202, message: "success"}
    else
      render json: {status: 404, message: heart_rate.errors.full_messages}
    end
  end

  def index
    heart_rate = HeartRate.last
    render json: { status: 202, message: "success", data: heart_rate.temperature }
  end
end
