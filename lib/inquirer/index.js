/*
 * 命令行提示用户输入
**/

const inquirer = require('inquirer');

module.exports = {
  askPackageMessage: () => {
		const questions = [{
			name: 'projectName',
			type: 'input',
			message: 'Enter a name for the repository:',
			validate: function(value) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter a name for the repository.';
				}
			}
    }, {
			name: 'version',
			type: 'input',
			message: 'Enter version for the repository:',
			default: '1.0.0',
			validate: function(value) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter a version of repository.';
				}
			}
		}, {
			name: 'description',
			type: 'input',
			message: 'Optionally enter a description of the repository:'
		}, {
			name: 'author',
			type: 'input',
			message: 'Enter a author for the repository:'
		}];
		return inquirer.prompt(questions)
	}
}
