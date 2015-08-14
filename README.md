# StudioVictory

## Setup Instructions (For Mac/Linux)

1. Install Apache Server, you can install it using MAMP, XAMPP, WAMPP or in native way.

2. Install the latest version of Vagrant (<http://www.vagrantup.com/downloads.html>)

3. Install the latest version of VirtualBox (<https://www.virtualbox.org/wiki/Downloads>)

4. Install the latest version of ChefDK (<https://downloads.getchef.com/chef-dk/>)

5. Install the latest version of Node.js (<http://nodejs.org/>)

6. Install the Berkshelf, Omnibus, and VBGuest plugins for VirtualBox:
  
  For Mac:

    `NOKOGIRI_USE_SYSTEM_LIBRARIES=1 vagrant plugin install vagrant-berkshelf vagrant-omnibus vagrant-vbguest`

  For Windows:

    `vagrant plugin install vagrant-berkshelf vagrant-omnibus vagrant-vbguest`

7. Install global dependencies:

    `npm install -g grunt-cli bower pm2 stylus`

8. Install local dependencies:

    `npm install`

9. Spin up your Vagrant VM:

    `vagrant up`

## Grunt Tasks
`grunt --help` lists available tasks.

* `grunt test` - Runs unit tests (default)
* `grunt analyze` - Validates code style
* `grunt status` - Shows status of node processes on Vagrant VM
* `grunt stop` - Stop node processes on Vagrant VM
* `grunt start` - Start node processes on Vagrant VM
* `grunt restart` - Restart node processes on Vagrant VM
* `grunt logs` - Tail logs for all node processes on Vagrant VM

## Vagrant Commands
`vagrant --help` lists available commands.

* `vagrant status` - Display status of the VM
* `vagrant up` - Power up, un-pause, or create the VM (dependent on status)
* `vagrant destroy` - Delete the VM
* `vagrant halt` - Power down the VM
* `vagrant suspend` - Pause the VM
* `vagrant reload` - Reboot the VM
* `vagrant ssh` - Open an SSH connection into the VM
* `vagrant provision` - (Re)provision the VM
* `vagrant destroy -f && vagrant up` - Rebuild VM
