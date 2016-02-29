#!/usr/bin/env node
 
/* 
 * This plugin helps you ignore files/folders from build
 * @author SharQ
 */

//required libs
var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];

//path's to exclude from build
var configfile = path.join(rootdir, "config.xml");
var configobj  = fs.readFileSync(configfile, 'utf8');
var paths      = configobj.match(/<ignore entries=['"](.*?)['"]/i)[1].split(',');

function _rename(paths, direction)
{
    //renamed entries
    var renamed = [];
    //direction of rename
    var direction = direction || 1;
    //hide entry (eg: f->.f, a/f->a/.f, a/b/f.txt->a/b/.f.txt)
    var dotEnd = function(v){var r=v.split('/');r.push("."+r.pop());r=r.join('/');return r};
    
    paths.forEach(function(val, index, array) 
    {
        //generate relative hidden paths
        var _from = val;
        var _to = dotEnd(val);
        
        //make real absolute paths
        var from = path.join(rootdir,'www',(direction==-1)?_to:_from);
        var to   = path.join(rootdir,'www',(direction==-1)?_from:_to);

        //rename entries
        fs.rename( from , to , function (err) 
        {
            if (err) 
            {
                console.log('Rename failed: '+from+" -> "+to+". ROLLBACK...");
                //if error -> roll back already succeded renames
                _rename(paths, -1 * direction);
                //and then throw error
                throw err;
            }
            
            //rename succeded
            renamed.push( val );
            //show result
            console.log('renamed: '+from+" -> "+to);
        });
    });
};

//run
_rename(paths, 1);
