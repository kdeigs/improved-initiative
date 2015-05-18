interface KnockoutBindingHandlers {
  focusOnRender: KnockoutBindingHandler;
  onEnter: KnockoutBindingHandler;
  uiText: KnockoutBindingHandler;
}
	
module ImprovedInitiative {
	ko.bindingHandlers.focusOnRender = {
    update: (element: any, valueAccessor: () => any, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext) => {
      //unwrap this so Knockout knows this update depends on the array's state
      ko.unwrap(viewModel.UserResponseRequests);
      $(element).find(valueAccessor()).select();
    }
  }
  
  ko.bindingHandlers.onEnter = {
    init: (element: any, valueAccessor: () => any, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext) => {
        var callback = valueAccessor();
        $(element).keypress(event => {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                callback.call(viewModel);
                return false;
            }
            return true;
        });
    }
  };
  
  ko.bindingHandlers.uiText = {
    update: (element: any, valueAccessor: () => any, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext) => {
      if(uiText[valueAccessor()]){
        $(element).html(uiText[valueAccessor()])
      } else {
        $(element).html(valueAccessor());
      }
      
    }
  }
}