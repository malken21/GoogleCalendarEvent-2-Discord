function getEventsSinceLastRun() {
    // スクリプトプロパティサービスを取得
    const scriptProperties = PropertiesService.getScriptProperties();

    // 前回実行時間をスクリプトプロパティから取得
    const lastRunTime = scriptProperties.getProperty('lastRunTime');
    let startTime;

    if (lastRunTime) {
        startTime = new Date(lastRunTime);
        Logger.log('前回実行時間: ' + startTime);
    } else {
        // 初回実行時は過去1週間のイベントを取得 (必要に応じて期間を変更)
        startTime = new Date();
        startTime.setDate(startTime.getDate() - 7);
        Logger.log('初回実行。過去1週間のイベントを取得します: ' + startTime);
    }

    // 現在時刻を取得
    const now = new Date();
    Logger.log('現在時刻: ' + now);

    const calendar = CalendarApp.getCalendarById(CalendarId);
    // 指定期間のイベントを取得
    const events = calendar.getEvents(startTime, now);

    Logger.log('取得したイベント数: ' + events.length);

    // 取得したイベントの情報をログに出力
    if (events.length > 0) {
        Logger.log('--- イベント情報 ---');
        events.forEach(function (event) {
            Logger.log('タイトル: ' + event.getTitle());
            Logger.log('開始時間: ' + event.getStartTime());
            Logger.log('終了時間: ' + event.getEndTime());
            Logger.log('場所: ' + event.getLocation());
            Logger.log('説明: ' + event.getDescription());
            Logger.log('--------------------');
        });
    } else {
        Logger.log('新しいイベントはありませんでした。');
    }

    // 現在時刻をスクリプトプロパティに保存
    scriptProperties.setProperty('lastRunTime', now.toISOString());
    Logger.log('次回の実行のために現在時刻を保存しました。');
}