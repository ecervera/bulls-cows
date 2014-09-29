function guess() {

	if (count==8 || won)
    	return;
        
    var guess = document.getElementById('guess').value;
    var numguesses = document.getElementById('numguesses');
    
    if (guess.length != 4) {
    	alert('Incorrect length!');
        return;
    }
    
    for (var i=0; i<4; i++) {
    	if (guess[i]<'0' || guess[i]>'9') {
        	alert('Incorrect values!');
            return;
        }
        for (var j=i+1; j<4; j++) {
        	if (guess[i]==guess[j]) {
            	alert('Duplicate number!');
                return;
            }
        }
    }
    count++;
    numguesses.value = count;
    
    var bulls = 0;
    var cows = 0;
    for (var i=0; i<4; i++)
    	for (var j=0; j<4; j++)
			if (guess[i]==secret[j]) {
            	if (i==j)
                	bulls++;
                else
                	cows++;
            }
	board.create('text',[2,9-count,guess],{fontSize:24,fixed:true});

	var numanimals = 0;
    for (var i=0; i<bulls; i++) {
    	board.create('image',['img/bull.jpg',[4.1+numanimals,8.6-count],[0.8,0.8]],{fixed:true});
        numanimals++;
    }
    for (var i=0; i<cows; i++) {
    	board.create('image',['img/cow.jpg',[4.1+numanimals,8.6-count],[0.8,0.8]],{fixed:true});
        numanimals++;
    }
    
    if (bulls==4) {
    	alert('Congratulations, you win!!!');
        won = true;
        return;
    }
    
    if (count==8) {
    	alert('You loose, hahaha!!!');
        return;
    }
}

var board;
var count;
var secret, won;

init();

function reset() {
	JXG.JSXGraph.freeBoard(board);
    init();
}

function init() {
    board = JXG.JSXGraph.initBoard('box', {boundingbox: [0, 8.5, 8, 0.5], 
                                           showNavigation:false, 
                                           showCopyright:false});
	count = 0;
    secret = '';
    var digit;
    var present;
    for (var i=0;i<4;i++) {
    	do {
        	digit = Math.floor(Math.random()*10).toString();
            present = false
            for (var j=0;j<i;j++)
            	if (secret[j]==digit)
                	present = true;
        } while (present);
        secret += digit;
    }
    console.log(secret);
    
    won = false;
    document.getElementById('numguesses').value = 0;
    document.getElementById('guess').value = '';
}
