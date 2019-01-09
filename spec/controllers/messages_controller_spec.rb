require 'rails_helper'

describe MessagesController do
  #  letを利用してテスト中使用するインスタンスを定義
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      # この中にログインしている場合のテストを記述
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      #インスタンス変数があるかどうか
      it 'assigns @message' do
      #引数で指定したクラスのインスタンスかつ未保存のレコードであるかどうか
        expect(assigns(:message)).to be_a_new(Message)
      end
      #@groupはeqマッチャを利用してassigns(:group)とgroupが同一であることを確かめる
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end
      #該当するビューが描画されているかどうか
      it 'redners index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      # この中にログインしていない場合のテストを記述
      before do
        get :index, params: { group_id: group.id }
      end
      #意図したビューにリダイレクトできているかをテスト
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      # この中にログインしている場合のテストを記述
      before do
        login user
      end

      # メッセージの保存に成功した場合のテストを記述
      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end
        #意図した画面に遷移しているかどうか
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

        # メッセージの保存に失敗した場合のテストを記述
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do
    # この中にログインしていない場合のテストを記述
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end