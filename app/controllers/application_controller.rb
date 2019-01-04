class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception # エラーを投げる
  before_action :authenticate_user! #ログイン済ユーザーのみにアクセスを許可（未ログイン時はログインページに遷移）

# 追加のパラメーターを許可:nameカラムを追加
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
