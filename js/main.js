
class player{
    
    constructor(){
        this.hand = new Hand();
        this.score = 0;
        this.choice = "";     
    }  

    play(ch){
        if(this.hand.handSshape.includes(ch)){
            this.choice = ch;
        }
        
    }
}

class Computer{
    constructor(){
       this.hand = new Hand();
       this.score = 0;
       this.choice = "";
    }

    playComp(){
        let randIndex = Math.floor((Math.random() * this.hand.handSshape.length - 1) + 1);
        this.choice = this.hand.handSshape[randIndex];

    }
}

class Game{

     constructor(){
        this.player = new player();
        this.computer = new Computer();
        this.playerScoreHtml = document.querySelector(".Pscore");
        this.computerScoreHtml = document.querySelector(".Cscore");
        this.restartBotton = document.getElementById("restartBtn").addEventListener("click", ()=>{
            
            this.restartGame();
            setTimeout(() => {
                document.querySelector(".scores").classList.remove("restartAnimation");
            },5000);
        });
    }

    start(){
        document.addEventListener("click" , (e)=>{
            if( e.target.dataset.name){
                e.stopPropagation();    
                 let symbol = e.target.dataset.name;
                 this.player.play(symbol);
                 this.computer.playComp();
                this.isWinner(this.player.choice , this.computer.choice);
            }
        
            
        })
    }

    isWinner(symbol1 , symbol2){
        let gameRule = {
            rock : "sciccors",
            sciccors : "paper",
            paper : "rock"
        }

       if(symbol1 == symbol2){
           this.showResultMsg("equal" , symbol2);
           return;
       } 
     let checkSymbol = gameRule[symbol1];
     if(checkSymbol == symbol2){
         this.player.score++;
         this.playerScoreHtml.innerHTML = this.player.score;
          this.showResultMsg("player" , symbol2);
         
     }else{
         this.computer.score++;
         this.computerScoreHtml.innerHTML = this.computer.score;
        this.showResultMsg("computer" , symbol2);
     }

    }

    showResultMsg(res , compChoice){
        if(res == "player"){
            document.querySelector(".winner").innerHTML = "You Win ";
            document.querySelector(".winner").style.color = "green";
        }else if(res == "computer"){
            document.querySelector(".winner").innerHTML = "You Lose";
            document.querySelector(".winner").style.color ="red";
        }else if(res == "equal"){
            document.querySelector(".winner").innerHTML = "It Is a Draw";
            document.querySelector(".winner").style.color = "black";

        }
        
        document.querySelector("#winnerSymbol").classList.add("fas" ,`fa-hand-${compChoice}`);
        document.querySelector(".result").classList.toggle("d-flex");
        document.querySelector(".cmpChos").innerHTML = compChoice;
        setTimeout(() => {
            document.querySelector(".result").classList.toggle("d-flex");
            document.querySelector("#winnerSymbol").classList.remove(`fa-hand-${compChoice}`);
        },5000);
        
    }

    restartGame(){
        document.querySelector(".scores").classList.add("restartAnimation");
        this.computer.score = 0;
        this.player.score = 0;
        this.playerScoreHtml.innerHTML = 0;
        this.computerScoreHtml.innerHTML = 0;
    }

}

class Hand{
    constructor(){
        this.handSshape = ["rock" , "paper" , "scissors"]
    }
}



let MyGame = new Game();
MyGame.start();
