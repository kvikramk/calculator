(function($){
    
    $.fn.calculator=function(){
        var that=this,
        operationUpdate=false,
        newOperation=false,
        // Set of buttons to display on calculator
        buttonDisplay=[
        {
            display:"0",
            name:"zero",
            type:"num",
            numKey:48
        },

        {
            display:"1",
            name:"one",
            type:"num",
            numKey:49
        },

        {
            display:"2",
            name:"two",
            type:"num",
            numKey:50
        },

        {
            display:"3",
            name:"three",
            type:"num",
            numKey:51
        },

        {
            display:"4",
            name:"four",
            type:"num",
            numKey:52
        },

        {
            display:"5",
            name:"five",
            type:"num",
            numKey:53
        },

        {
            display:"6",
            name:"six",
            type:"num",
            numKey:54
        },

        {
            display:"7",
            name:"seven",
            type:"num",
            numKey:55
        },

        {
            display:"8",
            name:"eight",
            type:"num",
            numKey:56
        },

        {
            display:"9",
            name:"nine",
            type:"num",
            numKey:57
        },

        {
            display:".",
            name:"dot",
            type:"num",
            numKey:46
        },

        {
            display:"+",
            name:"plus",
            type:"oper",
            numKey:43
        },

        {
            display:"-",
            name:"minus",
            type:"oper",
            numKey:45
        },

        {
            display:"/",
            name:"slash",
            type:"oper",
            numKey:47
        },

        {
            display:"*",
            name:"star",
            type:"oper",
            numKey:42
        },

        {
            display:"%",
            name:"percent",
            type:"oper",
            numKey:null
        },

        {
            display:"=",
            name:"equals",
            type:"oper",
            numKey:61
        },

        {
            display:"<-",
            name:"backspace",
            type:"oper",
            numKey:8
        },
        {
            display:"C",
            name:"clear",
            type:"oper",
            numKey:null
        }
        ],
       
        //Displays Calculator with the list of buttons declared.
        showCalculator=function(){
            $('<input/>').attr({
                id:'outputExp',
                type:'text',
                value:'',
                readOnly:"readOnly"
            }).appendTo(that);
            $('<input/>').attr({
                id:'outputField',
                type:'text',
                value:'0',
                readOnly:"readOnly"
            }).appendTo(that);
            $('<br/>').appendTo(that);
            for(var i=0;i<buttonDisplay.length;i++){
                $('<input/>').attr({
                    id:buttonDisplay[i]['name'],
                    type:'button',
                    value:buttonDisplay[i]['display']
                }).addClass(buttonDisplay[i]['type']).appendTo(that);
            }
            bindCalculator();
        },
       
        //Binds keypress events and click events to the buttons displayed.
        bindCalculator=function(){
            $("#calculatorid input[type='button']").bind('click',function(){
                processButtonClicked(this);
            })
            $("#outputField").focus();
            $("#outputField").keypress(function(e){
                for(var i=0;i<buttonDisplay.length;i++){
                    if(e.which==buttonDisplay[i]['numKey']){
                        $("input#"+buttonDisplay[i]['name']).trigger('click');
                        break;
                    }
                }
            
            });
        },
       
        evaluateExp=function(exp){
            return eval(exp);
        },
       
        //Every valid button clicked is processed.
        processButtonClicked=function(button){
            var currentValue=$("#outputField").val(),
            currentExp=$("#outputExp").val(),
            newValue=button.value,
            oper=false,
            num=false;
            $(button).fadeOut(100).fadeIn(100);
            switch(newValue){
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '0':
                    if(currentValue==0)
                        currentValue='';
                    var finalValue=currentValue+newValue;
                    if(newOperation){
                        finalValue=newValue;
                        newOperation=false;
                    }
                    num=true;
                    break;
                case '.':
                    if(currentValue.indexOf('.')==-1){
                        finalValue=currentValue+newValue;
                        num=true;
                    }
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    if(!operationUpdate){
                        currentExp=currentExp+currentValue+newValue;
                        operationUpdate=true;
                        oper=true;
                    }
                    break;
                case '<-':
                    if(!operationUpdate&&!newOperation){
                        num=true;
                        finalValue=currentValue.substr(0, currentValue.length-1);
                        if(finalValue=='')
                            finalValue=0;
                    }
                    break;
                case '=':
                    finalValue=evaluateExp(currentExp+currentValue);
                    operationUpdate=false;
                    num=true;
                    newOperation=true;
                    oper=true;
                    currentExp='';
                    break;
                case 'C':
                    operationUpdate=true;
                    currentExp='';
                    newValue='';
                    num=true;
                    oper=true;
                    break;
            }
            if(oper){
                $("#outputExp").val(currentExp);
            }
            if(num){
                if(operationUpdate){
                    $("#outputField").val(newValue);
                    operationUpdate=false;
                }
                else
                    $("#outputField").val(finalValue);
            }
           
        };
       
        showCalculator();
        
    }
    
})(jQuery);