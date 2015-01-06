# -*- mode: ruby -*-
# vi: set ft=ruby :

# Dependencies.
require 'yaml'
require 'pathname'

# Recursively finds a file in all parent directories.
def get_path(filename)

  Pathname(__FILE__).ascend{ |directory|
    path = directory + "mao.yml"; break path if path.file?
  }

end

# Parse the configuration file.
options = YAML.load_file(get_path("mao.yml"))

VAGRANTFILE_API_VERSION = "2"

# IP addresses for the various components.
# ip_database  = "#{options['ip_database']}"
# ip_magento   = "#{options['ip_magento']}"
# ip_wordpress = "#{options['ip_wordpress']}"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Default options for the VM.
  config.vm.box = "#{options['box']}"
  config.vm.box_url = "http://files.vagrantup.com/#{options['box']}.box"
  config.vm.network "forwarded_port", guest: 80, host: options['vagrant_port_http']
  config.vm.network "forwarded_port", guest: 22, host: options['vagrant_port_ssh'], id: "ssh", auto_correct: true
  # config.vm.network "private_network", ip: ip_database
  # config.vm.network "private_network", ip: ip_magento
  # config.vm.network "private_network", ip: ip_wordpress

  config.vm.provider "virtualbox" do |virtualbox|
    virtualbox.memory = options['vagrant_memory']
    virtualbox.cpus   = options['vagrant_cpus']
  end

  # Configure the synchronised directories.
  # config.vm.synced_folder "./websites/magento", "/usr/share/nginx/www/magento", create: true, nfs: true

  # Run the playbooks.
  options['playbooks'].each do |playbook|

    config.vm.provision "ansible" do |ansible|

      if options['debug']
        ansible.verbose = "vvvv"
      end

      ansible.playbook = "ansible/playbooks/#{playbook}.yml"

    end

  end

end