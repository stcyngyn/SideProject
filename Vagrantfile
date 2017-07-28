
# see gist here: https://gist.github.com/bennylope/5050811

# VAGRANTFILE_API_VERSION = "2"

Vagrant::Config.run do |config|
    config.vm.define :side_project do |side_project_config|
        # Every Vagrant virtual environment requires a box to build off of.
        side_project_config.vm.box = "ubuntu/trusty64" #virtualbox

        # The url from where the 'config.vm.box' box will be fetched if it
        # doesn't already exist on the user's system.
        side_project_config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64/versions/20160304.0.0/providers/virtualbox.box"

        # Forward a port from the guest to the host, which allows for outside
        # computers to access the VM, whereas host only networking does not.
        side_project_config.vm.forward_port 3000, 3000 # Ruby on Rails && Gulp
        side_project_config.vm.forward_port 80, 8080
        side_project_config.vm.forward_port 8000, 8001
        side_project_config.vm.forward_port 35729, 35730 # LiveReload
        side_project_config.vm.forward_port 5432, 5480, :auto => true # PostgreSQL

        # Add in a custom RAM setting (Not necessary, but recommended for huge projects)
        # This will give a warning, but don't worry about it
        side_project_config.vm.customize ["modifyvm", :id, "--memory", 2048]

        # Increase vagrant's patience during hang-y CentOS bootup
        # see: https://github.com/jedi4ever/veewee/issues/14
        side_project_config.ssh.max_tries = 50
        side_project_config.ssh.timeout   = 300
        
        # Add to /etc/hosts: 33.33.33.24 dev.playdoh.org
        side_project_config.vm.network :hostonly, "33.33.33.24"
        
    end
end