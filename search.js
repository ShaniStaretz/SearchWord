const currentPath = process.cwd();
const command = process.argv;
const fs = require('fs');
var arrF=[];
var arrD=[currentPath];

if(command.length==2)//missing parameters
{
	var filename = command[1].replace(/^.*[\\\/]/, '');
	console.log("USAGE: node " +filename+"  [EXT] [TEXT]");
}
else if(command.length==3)//filter files by extension only
{
	console.log("USAGE: node " +filename+"  [EXT] [TEXT]");
	
}


else if(command.length==4)//filter files by extension and find a word in the file
{
	var myExtension=command[2];
	while(arrD.length>0)
	{
		var c=arrD.pop();

			files=fs.readdirSync(c);
				files.forEach(file=>
				{
					var newp=c +'\\'+ file ;
					if (fs.statSync(newp).isDirectory())
					{
						arrD.push(newp);
					}
					else
					{
						var newp=c +'\\'+ file ;
						arrF.push(newp);
					}
				});
				
	}
	var fileFilteredList=[];
	arrF.forEach(file=>
	{
		var ex=file.split('.');
		if(ex[ex.length-1]===myExtension)
			fileFilteredList.push(file);
	});
	
	var myWord=command[3];
	searchInFile(fileFilteredList,myWord);
}


/*input:
/	
/	fileList= filtered list by extension
/	searchWord=required word to find.
/output:
	results=found list of files after search the required word
*/
function searchInFile(fileList,searchWord){
	var results = results || [];
	const fs = require('fs');
	var found=false;
fileList.forEach(file => {
        const fileContent = fs.readFileSync(file);

        // We want full words, so we use full word boundary in regex.
        const regex = new RegExp('\\b' + searchWord + '\\b');
        if (regex.test(fileContent)) {
			var fullputh=file.replace("/","\\");
            
			results.push(fullputh);
			found=true;
        
		}
		});
		
		if(!found)
			console.log('No file was found');
		else
			console.log(results);
}

/*-------------------------- general functions--------*/

/*input:
/	fileList= list type
/output:
	return false, if the list is empty and print accordingly, else return true 
*/
function listValidation (fileList)
{
	if(fileList.length<1)
	{
		console.log('No file was found');
	return false;
	}
	return true;
}
