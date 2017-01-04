/*
	@param (boxname)  		转动的容器class 或id 或obj	
	@param (rotTo)  		本次中奖位置
	@param (maxLen)  		奖品个数
	@param (speedTime)  	转动所需时间
	@param (rotSum)  		总圈数，即转到实际奖品外额外的圈数 
	@param (callFunc)   	完成后回调	
	@param (orientation)  	转动是转盘还是 指针，1为转盘， -1为指针
*/

(function(window,doc){

	Carousel  = function(boxname,options){
		var that = this;
		//必选，图片容器
		that.obj = typeof boxname == 'object' ? boxname : document.querySelector(boxname);  
		//可选参数，更正回调值
		that.options = {
			rotTo : options.rotTo,	 	//本次中奖位置
			maxLen : options.maxLen,       //奖品数
			speedTime: options.speedTime || 8 ,   //完成时间
			rotSum : options.rotSum || 11,		//总圈数
			callFunc: options.callFunc || '', //完成后回调
			orientation : options.orientation || 1, //旋转元素,1为盘，-1为针
			endTo : 0,   				
		}
		
		var disabled = that.obj.getAttribute("disabled");
		if(!disabled){
			that.obj.setAttribute("disabled","true");
			that._Refresh();
			setTimeout(function(){
				that._Count();
				that._Rotate();
			},110)
		}
	}

	Carousel.prototype = {
		// 角度计算
		_Count: function(){
			var that = this;
			that.options.rotTo = that.options.rotTo - 1;
			if(that.options.orientation == 1){
				this.options.endTo = (360 - this.options.rotTo * 360 / this.options.maxLen) + 360 * this.options.rotSum;
			}
			if(that.options.orientation == 2){
				this.options.endTo = this.options.rotTo * 360 / this.options.maxLen + 360 * this.options.rotSum;
			}
		},

		//旋转
		_Rotate: function(){
			var _this = this;
			this.obj.style.webkitTransition = "all "+ this.options.speedTime +"s cubic-bezier(0.45, 0.1, 0.2, 1)";
			this.obj.style.webkitTransform = "rotate(" + this.options.endTo +"deg)";
			setTimeout(function(){
				_this.obj.setAttribute("disabled","");
				//完成后回调
				if(_this.options.callFunc && typeof(_this.options.callFunc) === "function"){
					_this.options.callFunc();
				}
			},this.options.speedTime * 1000 + 110);
		},
	
		_Refresh: function(){
			this.options.endTo = 0;
			this.obj.style.webkitTransition = "all "+ 0.01 +"s cubic-bezier(0.45, 0.01, 0.2, 1)";
			this.obj.style.webkitTransform = "rotate(" + this.options.endTo +"deg)";
		},

	}
	
})(window,document)





			
			