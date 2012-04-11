class HomeController < ApplicationController
  def index
    @helps = $redis.hgetall('help').to_a
    render :action => "index"
  end
  
  def create
    render :action => "create"
  end
  
  def add
    @post = params[:dados]
    
    if @post
      @titulo = params[:dados]["real"] 
      @mensagem = params[:dados]["mensagem"]
      
      $redis.hset ("help", @titulo, @mensagem)
     
      data = $redis.hget "help", @titulo
        
      if data
        
        $redis.bgsave  
        redirect_to :action => "index", :saved => 1
      end
    
    end 
  end
  
  
  def view
    
    @helps = $redis.hgetall('help')
  
    render :action => 'view'
    
  end
  
  
  def getmsg
    key = params[:key]
    
    msg = $redis.hget 'help', key
    
    render :text => msg
  
  end 
  
  
  def del
    key = params[:key]
    
    $redis.hdel 'help' , key
    
    validation =  $redis.hexists 'help', key
    
    if validation == false
      render :text => 'ok'
    else
      render :text => validation
    end
    
  end
    
    
  
  
  
end
