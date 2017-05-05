class Api::BrainwavesController < ApplicationController
  # 1. Read raw brainwave data in microvolts from eeg into csv file.
  # 2. Process a few seconds of data with a script to obtain the current
  # frequency of the signal.
  # 3. Send that frequency value to the application so it can be saved and
  # interpreted into a frequency wave.
  def create
    # heart_rate = HeartRate.new(heart_rate: params["heart_rate"])
    if heart_rate.save
      render json: {status: 202, message: "success"}
    else
      render json: {status: 404, message: heart_rate.errors.full_messages}
    end
  end

  def index
    # heart_rate = HeartRate.last
    render json: { status: 202, message: "success", data: heart_rate.heart_rate }
  end
end
