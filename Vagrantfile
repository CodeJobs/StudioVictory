# -*- mode: ruby -*-
# vi: set ft=ruby :

VM = 'studiovictory'

Vagrant.configure(2) do |config|
  # Selecting Cent OS 7.0 Box
  config.vm.box = 'chef/centos-7.0'
  config.vbguest.auto_update = false

  # Proxy network, Node: 3000 & Apache: 9898
  config.vm.network :forwarded_port, guest: 3000, host: 9898, auto_correct: true
  config.vm.network :forwarded_port, guest: 22, host: 2200, id: "ssh", disabled: "true"
  config.vm.network :forwarded_port, guest: 22, host: 2201

  # Virtualbox setup
  config.vm.define VM
  config.vm.provider :virtualbox do |vb|
    vb.name = VM
  end

  # Fixing issue: stdin is not a tty
  ssh_fix = 'bash -c "BASH_ENV=/etc/profile exec bash"'
  config.ssh.shell = ssh_fix unless ARGV[0] == 'ssh'

  # Adding omnibus & berkshelf plugins
  config.omnibus.chef_version = :latest
  config.berkshelf.enabled = true
  config.berkshelf.berksfile_path = './Berksfile'

  # Chef provisioning
  config.vm.provision :chef_solo do |chef|
    chef.add_recipe VM
    chef.custom_config_path = 'Vagrantfile.chef'
    chef.json = {
      :nodejs => {
        :install_method => "package",
        :npm => "2.13.4"
      }
    }
  end

  # Start node app
  config.vm.provision :shell do |s|
    s.privileged = false
    s.inline = 'cd /vagrant && pm2 start pm2.json'
  end
end
