require 'em-websocket'
require 'thin'
require 'sinatra'
require 'json'

set :public_folder, './app'

EM.run do
    class App < Sinatra::Application
        get "/" do
            File.read('app/index.html')
        end
    end
    server = Thin::Server.start App, '0.0.0.0', 9000

    connections = []

    EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 3000) do |ws|
        ws.onopen do
            puts "Connection opened"
            connections << ws
        end

        ws.onclose { puts "Connection closed" }

        ws.onmessage do |msg|
            connections.each do |conn|
                send_msg = {"data" => msg}
                conn.send(send_msg.to_json)
            end
            puts "Recieved message: #{msg}"
        end
    end
end
