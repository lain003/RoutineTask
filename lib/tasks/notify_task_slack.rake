namespace :notify_task_slack do
  task run: :environment do
    client = Slack::Web::Client.new
    routine_task = RoutineTask.all.sample
    client.chat_postMessage(channel: '#general', text: routine_task.name + "を実行しましょう")
  end
end
