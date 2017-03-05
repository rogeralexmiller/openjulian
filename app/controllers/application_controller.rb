class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def require_api_token
    unless params[:api_token] == ENV["API_SECRET"]
      render json: {status: 404, message: "invalid api token"}
    end
  end
end
