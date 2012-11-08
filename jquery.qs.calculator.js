(function($){
    var newOperation=false,
    operationUpdate=false,
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
    ];
    $.widget('qs.calculator',{
        options:{
            success:$.noop,
            clear:$.noop
        },
        _create:function(){
            $('<input/>').attr({
                id:'outputExp',
                type:'text',
                value:'',
                readOnly:"readOnly"
            }).appendTo(this.element);
            $('<input/>').attr({
                id:'outputField',
                type:'text',
                value:'0',
                readOnly:"readOnly"
            }).appendTo(this.element);
            $('<br/>').appendTo(this.element);
            for(var i=0;i<buttonDisplay.length;i++){
                $('<input/>').attr({
                    id:buttonDisplay[i]['name'],
                    type:'button',
                    value:buttonDisplay[i]['display']
                }).addClass(buttonDisplay[i]['type']).appendTo(this.element);
            }
        },
        _destroy:function(){
            
        },
        _processButtonClicked:function(value){
            var currentValue=$("#outputField").val();
            
            var currentExp=$("#outputExp").val();
            var newValue=value;
            var oper=false;
            var num=false;
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
                    if(newOperation||operationUpdate){
                        finalValue=newValue;
                        newOperation=false;
                        operationUpdate=false;
                    }
                    this._updatevalues(true,false,finalValue,'');
                    break;
                case '.':
                    if(currentValue.indexOf('.')==-1){
                        finalValue=currentValue+newValue;
                        this._updatevalues(true,false,finalValue,'');
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
                        this._updatevalues(false,true,'',currentExp);
                    }
                    break;
                case '<-':
                    if(!operationUpdate&&!newOperation){
                        finalValue=currentValue.substr(0, currentValue.length-1);
                        if(finalValue=='')
                            finalValue=0;
                        this._updatevalues(true,false,finalValue,'');
                    }
                    break;
                case '=':
                    finalValue=this._evaluateExp(currentExp+currentValue);
                    operationUpdate=false;
                    this._updatevalues(true,true,finalValue,'');
                    newOperation=true;
                    console.log(this.options);
                    this._trigger('success');
                    break;
                case 'C':
                    operationUpdate=true;
                    this._updatevalues(true,true,'','');
                    this._trigger('clear');
                    break;
            }
            
           
        },
        _updatevalues:function(num,oper,value,exp){
            if(num){
                $("#outputField").val(value);
                operationUpdate=false;
            }
            if(oper){
                $("#outputExp").val(exp);
            }
        },
        _evaluateExp:function(exp){
            return eval(exp);
        },
        _init:function(){
            var that=this;
            $("#calculatorid input[type='button']").bind('click',function(){
                var valueEntered=this.value;
                that._processButtonClicked(valueEntered);
            })
            $("#outputField").focus();
            $("#outputField").keypress(function(e){
                var buttonPressed;
                for(var i=0;i<buttonDisplay.length;i++){
                    if(e.which==buttonDisplay[i]['numKey']){
                        buttonPressed=buttonDisplay[i]['display'];
                        $("input#"+buttonDisplay[i]['name']).fadeOut(100).fadeIn(100);
                        break;
                    }
                }
            
                if(e.which==13)
                    buttonPressed='=';
                
                if(typeof buttonPressed!='undefined'){
                    that._processButtonClicked(buttonPressed);
                }
            });
        }
    });
    
})(jQuery);