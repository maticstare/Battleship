class Battleship{
    constructor(player) {
        this.player = player;
        this.ai = new Array(10);
        this.aiUnveiled = new Array(10);

        this.najdenaLadja = [];
        this.searchDirection = 0;
        this.obrni = false;

        for(var i=0; i<10;i++){
            this.ai[i] = new Array(10);
            this.aiUnveiled[i] = new Array(10);
        }
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                this.ai[j][i] = '_';
                this.aiUnveiled[j][i] = ' ';
            }
        }
        this.placeShips();
    }
    placeShips(){
        var ladje = [5,4,3,3,2];
        for (var i = 0; i < ladje.length; i++){
            while(true){
                var orientation = Math.random() < 0.5;
                if (orientation){
                    var x = Math.floor(Math.random() * (10-ladje[i]) + ladje[i]);
                    var y = Math.floor(Math.random() * 10);
                    var n = true;
                    for (var l = 0; l < ladje[i]; l++) {
                        for (var j = -1; j <= 1; j++) {
                            for (var k = -1; k <= 1; k++) {
                                try{
                                    if(this.ai[x-l+j][y+k]=='#'){
                                        n=false;
                                    }
                                }catch (OOB){}

                            }
                        }
                    }
                    if (n){
                        for (var l = 0; l < ladje[i]; l++) {
                            this.ai[x-l][y]='#';
                        }
                        break;
                    }
                }else{
                    var x = Math.floor(Math.random() * 10);
                    var y = Math.floor(Math.random() * (10-ladje[i]));
                    var e = true;
                    for (var l = 0; l < ladje[i]; l++) {
                        for (var j = -1; j <= 1; j++) {
                            for (var k = -1; k <= 1; k++) {
                                try{
                                    if(this.ai[x+j][y+l+k]=='#'){
                                        e=false;
                                    }
                                }catch (OOB){}
                            }
                        }
                    }
                    if (e) {
                        for (var l = 0; l < ladje[i]; l++) {
                            this.ai[x][y+l]='#';
                        }
                        break;
                    }
                }
            }
        }
    }
    aiTurn(){
        if (this.najdenaLadja.length!=0){
            if (this.najdenaLadja.length==1) {
                if(this.searchDirection==0){
                    try{
                        if (this.aiUnveiled[this.najdenaLadja[0][0]-1][this.najdenaLadja[0][1]] == ' '){
                            this.aiUnveiled[this.najdenaLadja[0][0]-1][this.najdenaLadja[0][1]] = this.player[this.najdenaLadja[0][0]-1][this.najdenaLadja[0][1]];
                            if(this.player[this.najdenaLadja[0][0]-1][this.najdenaLadja[0][1]]=='#'){
                                this.najdenaLadja.splice(0,0, [this.najdenaLadja[0][0]-1,this.najdenaLadja[0][1]]);
                            }else{
                                this.searchDirection++;
                            }
                        }else{
                            this.searchDirection++;
                            this.aiTurn();
                        }
                    }catch (OOB){
                        this.searchDirection++;
                        this.aiTurn();
                    }
                }else if(this.searchDirection==1){
                    try{
                        if (this.aiUnveiled[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]+1] == ' '){
                            this.aiUnveiled[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]+1] = this.player[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]+1];
                            if(this.player[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]+1]=='#'){
                                this.najdenaLadja.push([this.najdenaLadja[0][0],this.najdenaLadja[0][1]+1]);
                            }else{
                                this.searchDirection++;
                            }
                        }else{
                            this.searchDirection++;
                            this.aiTurn();
                        }
                    }catch (OOB){
                        this.searchDirection++;
                        this.aiTurn();
                    }
                }else if(this.searchDirection==2){
                    try{
                        if (this.aiUnveiled[this.najdenaLadja[0][0]+1][this.najdenaLadja[0][1]] == ' '){
                            this.aiUnveiled[this.najdenaLadja[0][0]+1][this.najdenaLadja[0][1]] = this.player[this.najdenaLadja[0][0]+1][this.najdenaLadja[0][1]];
                            if(this.player[this.najdenaLadja[0][0]+1][this.najdenaLadja[0][1]]=='#'){
                                this.najdenaLadja.push([this.najdenaLadja[0][0]+1,this.najdenaLadja[0][1]]);
                            }else{
                                this.searchDirection++;
                            }
                        }else{
                            this.searchDirection++;
                            this.aiTurn();
                        }
                    }catch (OOB){
                        this.searchDirection++;
                        this.aiTurn();
                    }
                }else if(this.searchDirection==3){
                    try{
                        if (this.aiUnveiled[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]-1] == ' '){
                            this.aiUnveiled[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]-1] = this.player[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]-1];
                            if(this.player[this.najdenaLadja[0][0]][this.najdenaLadja[0][1]-1]=='#'){
                                this.najdenaLadja.splice(0,0, [this.najdenaLadja[0][0],this.najdenaLadja[0][1]-1]);
                            }else{
                                //potopljena
                                this.potopljena();
                            }
                        }else{
                            //potopljena
                            this.potopljena();
                        }
                    }catch (OOB){
                        //potopljena
                        this.potopljena();
                    }
                }
            }else{
                var prva = this.najdenaLadja[0];
                var zadnja = this.najdenaLadja.at(-1);
                if (zadnja[0] != prva[0] && !this.obrni){
                    try{
                        if (this.aiUnveiled[prva[0]-1][prva[1]] == ' '){
                            this.aiUnveiled[prva[0]-1][prva[1]] = this.player[prva[0]-1][prva[1]];
                            if (this.player[prva[0]-1][prva[1]]=="#"){
                                this.najdenaLadja.splice(0,0, [prva[0]-1, prva[1]]);
                            }else{
                                this.obrni = true;
                            }
                        }else{
                            this.obrni = true;
                            this.aiTurn();
                        }
                    }catch (OOB){
                        this.obrni = true;
                        this.aiTurn();
                    }
                }else if(zadnja[0] != prva[0] && this.obrni){
                    try{
                        if (this.aiUnveiled[zadnja[0]+1][zadnja[1]] == ' '){
                            this.aiUnveiled[zadnja[0]+1][zadnja[1]] = this.player[zadnja[0]+1][zadnja[1]];
                            if (this.player[zadnja[0]+1][zadnja[1]]=="#"){
                                this.najdenaLadja.push([zadnja[0]+1, zadnja[1]]);
                            }else{
                                //potopljena
                                this.potopljena();
                            }
                        }else{
                            //potopljena
                            this.potopljena();
                            this.aiTurn();
                        }
                    }catch (OOB){
                        //potopljena
                        this.potopljena();
                        this.aiTurn();
                    }
                }else if(zadnja[1] != prva[1] && !this.obrni){
                    try{
                        if (this.aiUnveiled[zadnja[0]][zadnja[1]+1] == ' '){
                            this.aiUnveiled[zadnja[0]][zadnja[1]+1] = this.player[zadnja[0]][zadnja[1]+1];
                            if (this.player[zadnja[0]][zadnja[1]+1]=="#"){
                                this.najdenaLadja.push([zadnja[0], zadnja[1]+1]);
                            }else{
                                this.obrni = true;
                            }
                        }else{
                            this.obrni = true;
                            this.aiTurn();
                        }

                    }catch (OOB){
                        this.obrni = true;
                        this.aiTurn();
                    }
                }else if(zadnja[1] != prva[1] && this.obrni){
                    try{
                        if (this.aiUnveiled[prva[0]][prva[1]-1] == ' '){
                            this.aiUnveiled[prva[0]][prva[1]-1] = this.player[prva[0]][prva[1]-1];
                            if (this.player[prva[0]][prva[1]-1]=="#"){
                                this.najdenaLadja.splice(0,0, [prva[0], prva[1]-1]);
                            }else{
                                //potopljena
                                this.potopljena();
                            }
                        }else{
                            //potopljena
                            this.potopljena();
                            this.aiTurn();
                        }
                    }catch (OOB){
                        //potopljena
                        this.potopljena();
                        this.aiTurn();
                    }
                }
            }
        }else{
            br:
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (this.aiUnveiled[i][j] == ' '){
                        while(true){
                            var x = Math.floor(Math.random() * 10);
                            var y = Math.floor(Math.random() * 10);
                            if (this.aiUnveiled[x][y] == ' '){
                                this.aiUnveiled[x][y] = this.player[x][y];
                                if (this.player[x][y]=='#'){
                                    this.najdenaLadja.push([x,y]);
                                }
                                break br;
                            }
                        }
                    }
                }
            }
        }
    }
    openNeighbours(){
        for (var tocka of this.najdenaLadja) {
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    try{
                        this.aiUnveiled[tocka[0]+i][tocka[1]+j] = this.ai[tocka[0]+i][tocka[1]+j];
                    }catch (OOB){}
                }
            }
        }
    }
    potopljena(){
        this.openNeighbours();
        this.searchDirection = 0;
        this.najdenaLadja = [];
        this.obrni = false;
    }

}