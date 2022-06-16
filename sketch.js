//Configurações da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
//Variáveis do nosso jogo
var imagemDeFundo;
var tower;
var towerImagem;
var cannon;
var angle;
var cannonBall;
var balls = [];

//Função que usamos para carregar os arquivos
function preload() {
 imagemDeFundo = loadImage("./assets/background.gif");
 towerImagem = loadImage("./assets/tower.png");
}

//Função de configuração
function setup() {
  //Cria a tela
  canvas = createCanvas(1200, 600);
  //Inicia o mundo com a biblioteca Matter
  engine = Engine.create();
  world = engine.world;
  //Configuração para a torre e o chão não caírem
  options={
    isStatic:true
  }

  //Cria o corpo para o chão
  ground= Bodies.rectangle(0,height-1, width*2,1,options);
  //Adiciona o corpo do chão ao mundo
  World.add(world,ground);

  //Cria o corpo para a torre
  tower = Bodies.rectangle(160,350,160,310,options);
  //Adiciona o corpo da torre ao mundo
  World.add(world,tower);

  //Define o modo do ângulo em graus
  angleMode(DEGREES);
  //Define o valor do ângulo
  angle = 20;
  //Cria o objeto de canhão com base na classe de Canhão
  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

//Função de desenho
function draw() {
  //Define a cor de fundo como cinza
  background(189);
  //Coloca a imagem de fundo do jogo
  image(imagemDeFundo,0,0,1200,600);

  //Faz a física do jogo ser atualizada
  Engine.update(engine);
 
  //Desenha o chão do jogo
  rect(ground.position.x, ground.position.y,width*2,1);
  
  //Faz a configuração desejada ser apenas para a torre
  push();
  //Define o modo da imagem como centralizada
  imageMode(CENTER);
  //Desenha a imagem da torre
  image(towerImagem, tower.position.x, tower.position.y, 160, 310);
  //Termina a configuração da torre
  pop();

  //Mostra o canhão
  cannon.display();

  //Mostra cada bala do canhão
  for(var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i],i);
  }

}

//Função que atira cada bala de canhão
function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

//Função que cria cada bala de canhão
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//Função que é chamada para mostrar cada bala de canhão
function showCannonBalls(ball, i){
  if(ball){
    ball.display();
  }
}