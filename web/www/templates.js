angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("home/template","<div class=\"row responsive-sm\"><div class=\"col col-50\"><p>Bridgeform is a FREE to use Brudging Loan sourcing system and marketplace.</p><div class=list><label class=\"item item-input\"><input type=number min=1 step=1 placeholder=\"How much do you want to borrow?\"></label><div class=\"item range range-positive\">For how long? <input type=range min=1 max=36 step=1 value=10></div><div class=\"item range range-positive\">Property Value <input type=range min=50000 max=50000000 step=1 value=50000></div><label class=\"item item-input item-select\"><div class=input-label>Type of charge</div><select><option selected>1st</option><option>2nd</option><option>3rd</option></select></label> <label class=\"item item-input item-select\"><div class=input-label>Security Type</div><select><option selected>Residential</option><option>Commercial</option><option>Land / Site with planning</option><option>Land / Site with no planning</option></select></label> <label class=\"item item-input item-select\"><div class=input-label>Your Credit</div><select><option selected>Good</option><option>Poor</option><option>Very Poor</option></select></label> <button class=\"button button-full button-positive\">Submit</button></div></div><div class=\"col col-50\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></div></div>");
$templateCache.put("login/template","<input ng-model=vm.username> <input ng-model=vm.password> <button ng-click=vm.doLogin()>Submit!</button>");}]);