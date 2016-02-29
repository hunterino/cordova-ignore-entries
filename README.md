# cordova-ignore-entries
Cordova Build Ignore Entries 

You can use this as a base to exclude files/folder from your cordova build. 

Usage: 
 - Add the two .js file to your **hooks** directory
 - Update your config.xml with this line: **&lt;ignore entries="foo/bar,ignore/asdf.html" /&gt;**

Notes: 
 - entries **relative to your www** directory
