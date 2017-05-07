class Api::BiometricsController < ApplicationController

  def create
    heart_rate = HeartRate.new(heart_rate: params["heart_rate"])
    temp = Temperature.new(temperature: params['temperature'])
    gsr = SkinResponse.new(gsr: params['gsr'])

    if gsr.save && temp.save && gsr.save
      render json: { status: 202, message: 'success' }
    else
      errors = gsr.errors.full_messages.concat(
        temp.errors.full_messages.concat(heart_rate.errors.full_messages))
      render json: { status: 404, message: errors }
    end
  end
end
