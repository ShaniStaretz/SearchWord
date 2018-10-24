
const currentPath = process.cwd();
const command = process.argv;
const fs = require('fs');


if(command.length==2)//missing parameters
{
	var filename = command[1].replace(/^.*[\\\/]/, '');
	console.log("USAGE: node " +filename+"  [EXT] [TEXT]");
}
else if(command.length==3)//filter files by extension only
{
	var myExtension=command[2];
	var fileList=[];
	LoadFiles(currentPath,fileList,myExtension);
	if(listValidation){
		fileList.forEach(file => {
			var fullputh=file.replace("/",'\\');
		console.log(fullputh);});// will print all files with the same extension;
	}
		}
else if(command.length==4)//filter files by extension and find a word in the file
{
	
	var myExtension=command[2];
	var myWord=command[3]
	searchFileByExtNWord(myWord,myExtension);
}

/*input:
/	myWord= require word to find in a file
/	myExt=required extension of a file.
/output:
	
*/
function searchFileByExtNWord(myWord,myExt){
	
	var fileList=[];
	LoadFiles(currentPath,fileList,myExt);
	if(listValidation(fileList))
		searchInFile(fileList,myWord);

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
			var fullputh=file.replace("/",'\\');
            
			results.push(fullputh);
			found=true;
        
		}
		});
		
		if(!found)
			console.log('No file was found');
		else
			printFileList(results)
}
/*input:
/	currentPath= current directory
/	fileList= list type
/	myExt=required extension of file.
/output:
	fileList=found list of files after filtered by extension
*/
function LoadFiles(currentPath,fileList,myExt)
{
	 var fs = fs || require('fs'),
      files = fs.readdirSync(currentPath);
  fileList = fileList || [];
  files.forEach(function(file) {
	  var newp=currentPath +'/'+ file ;
    if (fs.statSync(newp).isDirectory()) {
		
      fileList = LoadFiles(newp, fileList,myExt);
    }
    else {
		var newp=currentPath +'/'+ file ;
		var ex=getFileExtension(newp);
		
		if(ex[1]===myExt)
		{
			
		fileList.push(newp);
		}
		
    }
	
  });
  return fileList;
}

/*-------------------------- general functions--------*/
/*input:
/	
/	fileList= list type
/	
/output:
	print a list to console
*/
function printFileList(results)
{
	results.forEach(file => {
		console.log(file);
	});
}
/*input:
/	fileName=full path of a file.
/output:
	list of strings separate by '.' to find the file extension 
*/
function getFileExtension(filename) {
   return filename.split('.');
}
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