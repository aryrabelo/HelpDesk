class HomeController < ApplicationController
  def index
    render :action => "index"
  end
  
  def create
    render :action => "create"
  end
  
  def add
    @post = params[:dados]
    
    if @post
      @titulo = params[:dados]["titulo"] 
      @mensagem = params[:dados]["mensagem"]
      
      $redis.hset ("help", @titulo, @mensagem)
     
      data = $redis.hget "help", @titulo
      
      if data
        redirect_to :action => "index", :saved => 1
      end
    
    end 
  end
  
  
  def view
    @helps = $redis.hgetall('help')
    
    
    
    render :action => 'view'
    
    
  end
  
  
  
  
  
  
  
  
  
end
