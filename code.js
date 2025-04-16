function getEventsSinceLastRun() {
    // スクリプトプロパティサービスを取得
    const scriptProperties = PropertiesService.getScriptProperties();

    // 前回実行時間をスクリプトプロパティから取得
    const lastRunTime = scriptProperties.getProperty("lastEventTime");
    let startTime;

    if (lastRunTime) {
        startTime = new Date(lastRunTime);
    } else {
        // 初回実行時は過去1週間のイベントを取得
        startTime = new Date();
        startTime.setDate(startTime.getDate() - 7);
    }

    // 現在時刻を取得
    const now = new Date();

    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    // 指定期間のイベントを取得
    const events = calendar.getEvents(startTime, now)
        .filter(event => event.getStartTime() > startTime);

    // イベントが存在しなかったら return
    if (events.length < 1) return;

    // 開始日時で古い順にソート
    events.sort((a, b) => {
        return a.getStartTime().getTime() - b.getStartTime().getTime();
    });

    // 配列の最後のイベントを取得
    const lastEvent = events.at(-1);
    // 最後のイベントの開始時刻をスクリプトプロパティに保存
    scriptProperties.setProperty("lastEventTime",
        addOneSecond(lastEvent.getStartTime()).toISOString()
    );

    // 取得したイベントの情報を Discord に出力
    events.forEach(event => {
        Logger.log(`Title: ${event.getTitle()}`);
        sendDiscordWebhook(event);
        Utilities.sleep(3000);
    });
}