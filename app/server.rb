require 'em-websocket'
require 'thin'
require 'sinatra'

set :public_folder, './app'


EM.run do
  class App < Sinatra::Application
    get "/" do
      File.read('app/index.html')
    end
  end
  server = Thin::Server.start App, '0.0.0.0', 9000


  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 3000) do |ws|
  end
end  
