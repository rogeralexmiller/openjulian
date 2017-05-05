class Api::BrainwavesController < ApplicationController
  # 1. Read raw brainwave data in microvolts from eeg into csv file.
  # 2. Process a few seconds of data with a script to obtain the current
  # frequency of the signal.
  # 3. Send that frequency value to the application so it can be saved and
  # interpreted into a frequency wave.

  # To get the frequency of a given amplitude value:
  # 1. loop through data points. The time between each is 1/250 seconds since the sampling rate is 250 hertz
  # 2. To calculate the frequency of that peak, store number of data points between each peak.
  # 3. To get the frequency of a signal you have to first know what the peaks are.
      # One option is to calculate how many different buckets the data falls into: 0-5 mvolts, 5-10 etc.
      # then see how often a data point fallse into a bucket.
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
