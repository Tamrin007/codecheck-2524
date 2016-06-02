"use strict"

var assert = require("chai").assert,
    WebSocket = require('ws');

var user1Message = 'hi joe';
var user2Message = 'bot hey tom';

describe("Chat Server",function(){

  it('Should send back the message', function(done){ 
    var client1 = new WebSocket('ws://localhost:3000/');
    client1.onopen = function() {
      client1.send(user1Message);
      client1.onmessage = function(msg){
        var returnObject = JSON.parse(msg.data);
        assert.equal(returnObject.data, user1Message);
        client1.close();
        done();
      }
    }
  });

  it('Should broadcast chat message of new user to all users', function(done){

    var client1 = new WebSocket('ws://localhost:3000/');
    client1.onopen = function() {
      var client2 = new WebSocket('ws://localhost:3000/');
      var client3 = new WebSocket('ws://localhost:3000/');
      client2.onopen = function(){
        client3.onopen = function(){
          client1.send(user1Message);
          var client2_promise = new Promise(function(resolve) {
            client2.onmessage = function(msg){
              var returnObject = JSON.parse(msg.data);
              assert.equal(returnObject.data, user1Message);
              client2.close();
              client1.close();
              resolve("done");
            }
          });
          var client3_promise = new Promise( function(resolve){
              client3.onmessage = function(msg){
              var returnObject = JSON.parse(msg.data);
              assert.equal(returnObject.data, user1Message);
              client3.close();
              resolve("done");
            }
          });
          Promise.all([client2_promise, client3_promise]).then(function(res){
            done();
          }, function(err) {
            console.log("error: ", err);
          });
        }
      }
    };
  });

  it('Should check for bot command and and return the hash', function(done){

    var num = 0;
    var hash = "d202c06";

    var client1 = new WebSocket('ws://localhost:3000/');
    client1.onopen = function() {
      var client2 = new WebSocket('ws://localhost:3000/');
      client2.onopen = function(){
        client1.send(user2Message);
        client2.onmessage = function(msg){
          num++;
          var returnObject = JSON.parse(msg.data);
          if(num === 1) 
            assert.equal(returnObject.data, user2Message);
          else if(num === 2) 
          {
            assert.equal(returnObject.data, hash);
            client2.close();
            client1.close();
            done();
          }
        }
      }
    };
  });
});