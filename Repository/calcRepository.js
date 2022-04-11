var stackarr = [];


var top = -1;

// Push function for pushing
// elements inside stack
function push(e) {
    top++;
    stackarr[top] = e;
}

// Pop function for returning top element
function pop() {
    if (top == -1)
        return 0;
    else {
        var popped_ele = stackarr[top];
        top--;
        return popped_ele;
    }
}

// Function to check whether the passed
// character is operator or not
function operator(op) {
    if (op == '+' || op == '-' ||
        op == '^' || op == '*' ||
        op == '/' || op == '(' ||
        op == ')') {
        return true;
    }
    else
        return false;
}

// Function to return the precedency of operator
function precedency(pre) {
    if (pre == '@') {
        return 1;
    }
    else if (pre == '+' || pre == '-') {
        return 2;
    }
    else if (pre == '/' || pre == '*') {
        return 3;
    }
    else
        return 0;
}

// Function to convert Infix to Postfix
function InfixtoPostfix(infixValue) {

    // Postfix array created
    var postfix = [];
    var temp = 0;
    push('@');
    infixval = infixValue;

    // Iterate on infix string
    for (var i = 0; i < infixval.length; i++) {
        var el = infixval[i];

        // Checking whether operator or not
        if (operator(el)) {
                while (precedency(el) <=
                    precedency(stackarr[top]) && top > -1) {
                    // postfix[temp++] = pop();
                }
                push(el);
        }
        else {
            postfix[temp++] = el;
        }
    }

    // Adding character until stackarr[top] is @
    while (stackarr[top] != '@') {
        postfix[temp++] = pop();
    }

    var st = "";
    for (var i = 0; i < postfix.length; i++)
        st += postfix[i];

    return st;
}

function calcRPN( postfixArray ) {
    var stack = [];

    for( element of postfixArray){
        if(isNaN(element)){
            var x = stack.pop();
            var y = stack.pop();
            if (element == "+"){
                result = (y+x);
                stack.push(y + x);
            } else if (element == '-'){
                stack.push(y - x);
            } else if (element == '*'){
                stack.push(y * x);
            } else if (element == '/'){
                stack.push(y / x);
            }
        } else {
            stack.push( parseFloat(element) );
        }
    }
    var returnValue = null;
    while( stack.length > 0 ){
        var element = stack.pop();  
        if(isNaN(element)){
            continue;
        } else{
            returnValue = element;
        }
    }
    return returnValue;
}

module.exports = {
    InfixtoPostfix,
    calcRPN
}