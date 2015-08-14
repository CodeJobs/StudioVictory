include_recipe 'redisio'
include_recipe 'redisio::enable'
include_recipe 'yum-epel'

node['nodejs']['packages'].each do |node_pkg|
  package node_pkg
end

node['npm']['packages'].each do |pkg, ver|
  nodejs_npm pkg do
    version ver
  end
end
