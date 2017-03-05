class Api::TemperaturesController < ApplicationController

  def create
    temp = Temperature.new(temperature: params[:temperature])
    if temp.save
      render json: {status: 202, message: "success"}
    else
      render json: {status: 404, message: "failure"}
    end
  end
end
