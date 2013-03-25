// Called by HTML body element's onload event when the widget is ready to start
function load()

{
    dashcode.setupParts();
    
    if (getStatus()){
        document.getElementById("button2").object.textElement.innerText = "Hide Hidden Files";
	} else {
		document.getElementById("button2").object.textElement.innerText = "Show Hidden Files";
	}
}

// Called when the widget has been removed from the Dashboard
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

// Called when the widget has been hidden
function hide()
{
    // Stop any timers to prevent CPU usage
}

// Called when the widget has been shown
function show()
{
    if (getStatus()){
        document.getElementById("button2").object.textElement.innerText = "Hide Hidden Files";
	} else {
		document.getElementById("button2").object.textElement.innerText = "Show Hidden Files";
	}
}

// Called when the widget has been synchronized with .Mac
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

// Called when the info button is clicked to show the back of the widget
// event: onClick event from the info button
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

// Called when the done button is clicked from the back of the widget
// event: onClick event from the done button
function showFront(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}


function goToWebsite(event)
{
    widget.openURL("http://chuckwagoncomputing.github.com");
}


function donateToCws(event)
{
    widget.openURL("https://flattr.com/profile/chuckwagoncomputing");
}


function quitFinder(event)
{
    widget.system("/usr/bin/osascript -e 'tell application \"Finder\" to quit'", null);
    widget.system("/usr/bin/osascript -e 'tell application \"Finder\" to activate'", null);
}


function showFiles(event)
{
    var status = getStatus();
	if (status){
		widget.system("/usr/bin/defaults write com.apple.finder AppleShowAllFiles FALSE", null);
		document.getElementById("button2").object.textElement.innerText = "Show Hidden Files";	
	} else {
		widget.system("/usr/bin/defaults write com.apple.finder AppleShowAllFiles TRUE", null);
		document.getElementById("button2").object.textElement.innerText = "Hide Hidden Files";
	}
    
    widget.system("/usr/bin/osascript -e 'tell application \"Finder\" to quit'" , null);
    widget.system("/usr/bin/osascript -e 'tell application \"Finder\" to activate'" , null);
    
}

function getStatus() {
	var readplist = widget.system("/usr/bin/defaults read com.apple.finder AppleShowAllFiles", null).outputString;
	
	if (readplist == "TRUE\n"){
		return true;
	} else {
		return false;
    }
}


function logOut(event)
{
    widget.system("kill -9 -1", null);
}


function quitDock(event)
{
    widget.system("/usr/bin/osascript -e 'tell application \"Dock\" to quit'", null);
	widget.system("/usr/bin/osascript -e 'tell application \"Dock\" to activate'", null);
}
