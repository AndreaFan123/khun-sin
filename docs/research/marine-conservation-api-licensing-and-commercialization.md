# 海洋保育整合 API：授權與商業可行性研究

最後查核：2026-10-13  
研究範圍：Khun-Sin 將臺灣及全球海洋保育資料聚合、清理、標準化後，透過免費或付費 API 對第三方提供。  
文件性質：初步授權與產品可行性研究，不構成法律意見。正式收費或簽約前，應由熟悉資料授權與跨境智慧財產權的律師審閱實際資料集、API 條款及客戶合約。

## 一、結論

這個商業構想**可以成立，但必須採「依授權分流」的資料產品，而不是把所有來源混成一個可下載 API**。

目前適合成為免費與付費 API 核心的資料是：

1. 採用臺灣「政府資料開放授權條款－第 1 版」的 MARN、海龜統計、海域水質等資料。
2. 明確標示為 CC0 的 OBIS、GBIF 或其他資料集。
3. 明確標示為 CC BY，且已保存作者、來源、版本及變更紀錄的資料集。
4. Khun-Sin 自行產生、不受第三方限制的清理結果、品質旗標、欄位對照、分析與服務功能。

目前**不能直接放進付費 API**的資料包括：

- CC BY-NC 資料。
- IUCN Red List API 與空間資料；官方 API 明確禁止商業用途，原始資料也限制再散布。
- Protected Planet WDPCA／GD-PAME；條款禁止未經許可的商業利用、衍生商業利用及透過 web service 再散布。
- MPAtlas；條款禁止未經許可的商業使用與 API／web service 再散布。
- OBIS-SEAMAP 中非 CC0 的下載資料；平台條款禁止未經同意再次散布下載資料，即使個別資料集顯示 CC BY，仍不宜在未取得書面澄清前納入對外 API。
- Ocean+／UNEP-WCMC 圖層中尚未逐一確認商業及再散布授權的資料。
- IWC 尚未建成的全球擱淺資料庫。

最可行的商業定位不是「販售免費資料」，而是針對下列價值收費：

- 跨來源欄位標準化與物種名稱解析。
- 去重、品質檢查、版本管理與可追溯 provenance。
- 穩定 API、較高用量、批次匯出、Webhook、SLA 與技術支援。
- 去識別、座標降精度與敏感資料政策。
- 可重現的統計、空間查詢與變更通知。

上游的開放資料仍維持其原授權；付費客戶購買的是 Khun-Sin 的處理與服務，不是資料的獨占權。

## 二、「提供我們的 API」涉及哪些權利

把上游資料儲存在 Khun-Sin，再讓第三方呼叫 API，通常至少涉及：

1. **重製**：下載、快取及保存上游資料。
2. **改作或衍生**：清理欄位、轉換座標、合併分類、建立指標。
3. **散布或公開傳輸**：API 回應把資料交付第三方。
4. **再授權**：允許 API 使用者再利用收到的資料。
5. **商業使用**：收費、廣告、為營利公司提供服務或支援營收活動。

「來源免費」只代表取得時可能不用付費，不表示可以轉售、再散布或放進商業產品。反過來，CC BY 與臺灣政府開放資料即使原始下載免費，仍可依法用於收費產品，只要完整遵守顯名及其他條件。

另外，**免費 API 不一定是非商業使用**。Protected Planet 與 MPAtlas 把「由營利實體使用」以及「任何產生收入的使用」都列入 commercial use；如果免費端點屬於同一個 freemium 商業服務，不能假設它自動符合非商業條件。

## 三、逐來源授權判定

### 判定標記

- **綠燈**：可納入免費與付費 API，但仍須履行顯名、版本及資料治理義務。
- **黃燈**：只能逐資料集或取得書面許可後納入。
- **紅燈**：目前條款不允許本構想，或根本沒有可接入的資料服務。

| 來源 | 免費 API | 付費 API | 再散布 | 初步判定 |
|---|---:|---:|---:|---|
| 臺灣政府開放資料第 1 版 | 可 | 可 | 可 | 綠燈；強制顯名 |
| CC0 資料集 | 可 | 可 | 可 | 綠燈；仍建議保留來源 |
| CC BY 資料集 | 可 | 可 | 可 | 綠燈；須署名、連結授權、標示變更 |
| OBIS | 視資料集 | 視資料集 | 視資料集 | 黃燈；只能白名單納入 CC0／CC BY |
| GBIF | 視資料集 | 視資料集 | 視資料集 | 黃燈；只能白名單納入 CC0／CC BY |
| OBIS-SEAMAP | 僅明確 CC0 | 原則不可 | 原則不可 | 黃／紅燈；非 CC0 須書面同意 |
| IUCN Red List | 原則不可對外再提供 | 不可 | 原則不可 | 紅燈；商業須另洽 IUCN／IBAT |
| Protected Planet | 不可（非下載展示另論） | 不可 | 不可 | 紅燈；API 本身屬可下載再散布 |
| MPAtlas | 不可（須另取得許可） | 不可 | 不可 | 紅燈；可書面申請特定商業用途 |
| Ocean+／UNEP-WCMC 圖層 | 視圖層 | 視圖層 | 視圖層 | 黃燈；沒有平台級統一商用授權 |
| IWC 全球擱淺資料庫 | 不可 | 不可 | 不適用 | 紅燈；尚在規劃早期階段 |

### 1. 臺灣政府開放資料與 MARN：可作商業核心

[政府資料開放授權條款－第 1 版](https://data.gov.tw/license)授權使用者：

- 不限目的、時間及地域使用。
- 重製、散布、公開傳輸、編輯及改作。
- 建立各種產品或服務型態的衍生物。
- 再轉授權他人利用。
- 免授權金，且無須另外取得書面同意。

主要義務是明確標示原資料提供機關、資料名稱與版本；未履行顯名義務時，授權會被視為自始未取得。該條款也明示與 CC BY 4.0 相容。

[MARN 鯨豚擱淺資料](https://data.gov.tw/dataset/157624)目前提供 CSV 與 JSON，欄位包括日期、縣市、WGS84 座標、物種、狀態、群體、體長、處理方式與通報單位，授權為政府資料開放授權條款第 1 版。因此可作為 Khun-Sin 免費及付費 API 的第一個核心資料集。

[國內海龜擱淺件數統計](https://data.gov.tw/dataset/171189)及[海域水質](https://data.gov.tw/dataset/155934)也採相同授權，可作為後續擴充候選。

商業使用仍須注意：

- 不可暗示海洋保育署為 Khun-Sin 或付費服務背書。
- 原機關可因公共利益、第三人權利或其他正當原因停止提供資料；Khun-Sin 需要保存版本與中斷處理策略。
- 開放授權不等於保證資料正確，也不處理敏感物種位置、個資、商標或第三人其他權利。

### 2. CC0 與 CC BY：可以收費，但不能抹除上游權利

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)允許複製、修改及散布，包括商業用途，原則上不要求取得許可。實務上仍應保留來源、資料集識別碼與免責資訊。

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)允許任何目的的分享與改作，包括商業用途，但必須：

- 給予適當署名。
- 提供原資料及授權條款連結。
- 標示是否做過修改。
- 不得暗示原作者背書。
- 不得對資料再施加會阻止使用者行使 CC BY 權利的法律或技術限制。

因此 Khun-Sin 可以對 API 穩定性、運算、流量與支援收費，但 API 客戶收到 CC BY 原始資料後，仍保有 CC BY 所允許的再利用權。Khun-Sin 的服務條款可以限制帳號分享、濫用或繞過 rate limit，卻不應宣稱對 CC BY 原始資料具有獨占權，也不應禁止客戶依法再散布該部分資料。

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)禁止主要為商業利益或金錢報酬的利用，不應出現在付費 API、付費方案的免費試用，或用來促成營收的免費端點中，除非另取得權利人授權。

### 3. OBIS：平台可接，但必須做資料集級白名單

[OBIS 資料存取文件](https://obis.org/data/access/)提供 API、R 套件、Mapper 與大型 GeoParquet 匯出；[OBIS 政策](https://manual.obis.org/policy.html)則說明資料通常採 CC0、CC BY 或 CC BY-NC，使用與產品應妥善引用。

OBIS 本身不是一張可統一套用商業授權的資料表。Khun-Sin 必須在 ingest 前讀取每個 dataset 的 license：

- CC0：可進免費及付費 API。
- CC BY：可進免費及付費 API，保留署名及變更紀錄。
- CC BY-NC：排除商業產品。
- 授權缺失、無法辨識或與原始發布者不一致：拒絕匯入並進人工審查。

大型匯出也會包含底層資料集授權清單；不得只引用 OBIS 而省略個別資料集的授權及 citation。

### 4. GBIF：技術成熟，但商業適用性也是逐資料集決定

[GBIF Terms of Use](https://www.gbif.org/terms)規定 occurrence datasets 採 CC0、CC BY 或 CC BY-NC 的機器可讀授權；[GBIF API](https://techdocs.gbif.org/en/openapi/)支援 occurrence、species、map 與非同步批次下載。

Khun-Sin 可採與 OBIS 相同的白名單規則，只納入 CC0 與 CC BY。對大量資料應使用 download API，而不是逐頁爬取，並保存 download DOI、查詢條件、下載日期及每個資料集的 citation。

需要特別處理 OBIS 與 GBIF 之間的重複：許多 OBIS-SEAMAP 或 OBIS 資料也會發布到 GBIF。若同一 observation 由兩條來源進入，不能因來源 URL 不同而算成兩筆事件。

### 5. OBIS-SEAMAP：有商業使用文字，但平台條款禁止再次散布

[OBIS-SEAMAP Terms of Use](https://seamap.env.duke.edu/content/termsofuse)區分 CC BY、CC BY-NC、permission required 與 CC0，也允許在出版品、產品或 commercial application 中使用適用的資料。然而同一條款另外規定：除非資料集明確為 CC0，否則不得未經 OBIS-SEAMAP 與原始貢獻者同意，再透過任何媒介散布已下載資料。

因此：

- 明確 CC0 的資料可納入 API。
- CC BY 資料即使一般 CC BY 容許商業再散布，仍存在平台附加條款衝突；公開 API 前應取得 OBIS-SEAMAP 的書面澄清或同意。
- CC BY-NC 不納入商業 API。
- permission required 必須逐資料集取得書面許可。
- OBIS-SEAMAP 產生的 gridded summary 雖標示 CC BY，也應先確認「不得再散布」條款是否仍適用。

較安全的做法是：若同一筆資料已由 OBIS 或 GBIF 依清楚的 CC0／CC BY 授權發布，從該正式聚合版本 ingest，並保存其授權鏈；不要以 OBIS-SEAMAP 的下載檔直接建立轉售 API。

### 6. IUCN Red List：不能直接用於付費 API

[IUCN Red List API v4](https://api.iucnredlist.org/)明確表示 API 僅以保育、教育與研究等非商業使用為主，商業使用嚴格禁止；商業需求應考慮 IBAT。官方也要求頻繁使用前先確認快取權限。

IUCN 的資料使用規範另禁止未經書面許可，透過 web services、可下載地圖或其他方式重新發布 Red List 資料。衍生作品原則上也必須維持非商業限制。[空間資料下載頁](https://www.iucnredlist.org/resources/spatial-data-download)同樣把商業用途導向 IBAT。

專案不應因「只回傳物種保育等級」就自行認定付費使用安全。舊版規範曾對 category 與 taxon 的組合提供較寬鬆說明，但現行 v4 API 仍直接禁止商業使用。正式採用前應取得 IUCN 書面確認或商業授權。

可行方案：

- 免費、非商業研究環境：依 token 與條款使用，不對外再散布原始回應。
- 付費產品：與 IUCN／IBAT 談商業授權，或不提供 IUCN 欄位，只連回 IUCN 官方頁面。
- 客戶自備 IBAT／IUCN 憑證：仍需確認其客戶合約是否允許 Khun-Sin 代為處理；BYOK 並不自動解決再散布問題。

### 7. Protected Planet：明確禁止以我們的 API 再提供

[Protected Planet API](https://api.protectedplanet.net/)明示 API 不提供商業使用；其 commercial use 定義包含營利實體的使用，以及任何產生收入的使用。

[Protected Planet legal terms](https://www.protectedplanet.net/en/legal)進一步規定：

- WDPCA、GD-PAME 及以其為基礎的衍生作品，不得未經書面許可投入商業使用。
- 不得再授權或再散布。
- 明確禁止透過 web services、可下載互動地圖、KML 或檔案傳輸提供資料。
- 非商業線上發布必須不可下載、清楚署名、標明版本並連回 Protected Planet。

因此，把保護區幾何、屬性或可反推出原始資料的衍生結果放進 Khun-Sin API，無論免費或付費，都不符合一般條款。若產品需要此功能，應直接洽 UNEP-WCMC 或使用 IBAT 的商業方案。

### 8. MPAtlas：可申請 API，但預設僅非商業且禁止再散布

[MPAtlas Data Use](https://marine-conservation.org/data-use/)禁止未經書面許可的商業使用、衍生商業利用、再授權，以及透過 web service 或可下載地圖再散布。[MPAtlas Data Download](https://marine-conservation.org/mpatlas/download/)表示 API 可透過 email 申請，也可能針對有限且特定的商業用途提供許可。

因此 MPAtlas 不應進入一般付費 API；但它比完全封閉來源多一條可談判路徑。若 MPA 保護強度成為核心付費功能，應提出具體資料欄位、使用者、查詢量、是否快取與是否可下載，向 MPAtlas 申請商業及再散布授權。

### 9. Ocean+／UNEP-WCMC：逐圖層審查，不把平台名稱當授權

[Ocean+ Data Viewer 資源頁](https://resources.unep-wcmc.org/products/WCMC_PT006)曾提供多種全球海洋 GIS 圖層；[官方 Ocean+ Habitats FAQ](https://ocean-plus-habitats.web-supported-staging.linode.unep-wcmc.org/)說明 Data Viewer 已退役，且各資料集維持原本不同的授權條件。

這代表不能用「來自 Ocean+」作為商業授權依據。每個圖層都必須回到原始發布者及 metadata，確認：

- 是否為 CC0、CC BY、非商業授權或自訂條款。
- 是否允許建立衍生資料及再散布。
- 是否有第三方底圖、衛星資料或敏感棲地限制。

只有確認為 CC0 或 CC BY 的特定版本，才進入商業白名單。

### 10. IWC 與 MEDACES：目前不作為 API 上游

[IWC Strandings Initiative](https://iwc.int/management-and-conservation/strandings/strandings-initiative)說明全球擱淺資料庫仍在早期規劃階段，現階段先發展區域資料庫提案；目前沒有可授權或串接的全球 API。

MEDACES 是區域性資料庫，但公開下載、API、再散布與商業授權仍不明確。在取得資料管理單位的書面條款前，只能作研究案例，不能納入免費或付費 API。

## 四、推薦的資料產品模型

### 免費方案：Open Data API

只提供：

- 臺灣政府開放資料第 1 版。
- CC0。
- 經白名單審查的 CC BY。
- Khun-Sin 自行建立且有權發布的 metadata、品質旗標與欄位說明。

免費方案可設定合理 rate limit，但每筆資料都必須保有上游授權。Rate limit 是服務運行規則，不是剝奪使用者取得資料後依法再利用的權利。

### 付費方案：Value-added API

使用相同的 commercial-safe 資料，付費項目包括：

- 更高 rate limit 與批次查詢。
- 歷史快照與版本差異。
- 統一 taxonomy、欄位正規化與資料品質分數。
- 去重、地理索引、空間聚合與時間序列。
- Webhook、監測與更新通知。
- SLA、稽核紀錄及客戶支援。
- 客戶專屬匯出、資料倉儲同步或研究工作流。

付費方案不能把 CC BY-NC、Protected Planet、IUCN 或 MPAtlas 混進來，除非 Khun-Sin 已取得覆蓋 API 再散布與商業使用的獨立書面合約。

### 企業方案：Licensed Connectors

針對 Restricted sources 提供：

- 協助客戶連接其自有商業授權。
- 只在客戶授權範圍內運算，不向其他客戶共用資料。
- 不把第三方 token 或資料帶入一般快取。
- 依來源合約控制欄位、保存期限、匯出與刪除。

此方案必須逐供應商、逐客戶審查，不能以「客戶自備 key」概括處理。

## 五、API 與資料庫應有的授權控制

### 1. 每個資料集建立 license registry

最低欄位：

```text
dataset_id
publisher
source_url
upstream_dataset_id
license_code
license_url
commercial_use_status
redistribution_status
derivatives_status
attribution_text
citation
version
retrieved_at
reviewed_at
review_status
review_notes
```

三個 `*_status` 欄位不應是容易把未知值當成 `false` 或 `true` 的 boolean，而應使用 `allowed`、`prohibited`、`permission_required`、`unknown` 四種狀態。任何 `license_code` 缺失、狀態為 `unknown`、無法解析或前後衝突的資料，一律 fail closed，不發布至公共 API。

### 2. 每筆紀錄保留 provenance

建議 API 回應至少保留：

```json
{
  "source": {
    "datasetId": "oca-marn-cetacean-strandings",
    "publisher": "海洋委員會海洋保育署",
    "license": "OGDL-Taiwan-1.0",
    "licenseUrl": "https://data.gov.tw/license",
    "sourceRecordId": "...",
    "retrievedAt": "2026-10-13",
    "citation": "..."
  },
  "provenance": {
    "transforms": ["normalized-species-name", "generalized-location"],
    "locationPrecisionMeters": 10000
  }
}
```

批次回應另提供 attribution manifest，列出本次結果實際使用到的資料集、授權與引用；不能只在網站頁尾寫一句「資料來源：OBIS」。

### 3. 不相容授權分開儲存與發布

建議至少分成：

```text
commercial_open  -> OGL、CC0、CC BY
noncommercial    -> CC BY-NC 或只准研究用途
restricted       -> IUCN、Protected Planet、MPAtlas、permission-required
link_only        -> 不保存資料，只保存官方頁面與識別碼
```

公開及付費 API 的查詢只能命中 `commercial_open`。不要在查詢時才臨時判斷；在 ingest 與發布兩個階段都設阻擋條件。

### 4. 原始資料與 Khun-Sin 產出分層

- `raw`：不可改寫的上游快照、checksum、下載資訊。
- `normalized`：欄位、taxonomy、單位與座標轉換。
- `derived`：去重、品質旗標、空間聚合及指標。
- `published`：經授權與敏感資料政策核准後的 API 投影。

每一層都要能回溯來源。即使 derived 欄位由 Khun-Sin 產生，只要依賴 Protected Planet、IUCN 或 MPAtlas，也不能假設它因此脫離上游的商業限制。

## 六、敏感資料與資料品質

即使授權允許商業使用，也不代表所有欄位都應原樣公開：

- 活體擱淺、救援進行中的即時精確位置可能造成圍觀及干擾。
- 瀕危物種、繁殖地與棲地位置可能需要降精度或延遲發布。
- 多個 occurrence aggregators 可能收錄同一筆原始觀測，必須去重。
- 點位密度受調查努力量影響，不能直接當作族群數量或風險率。
- 擱淺資料轉成 occurrence schema 時，可能遺失生死、病理與死因欄位。

建議公開 API 預設提供縣市、網格或降精度座標；只有具有正當用途及適當權限的研究者可申請更精確資料。這是產品治理要求，仍須再確認主管機關及資料提供者對敏感位置的最新規範。

## 七、建議執行順序

### Phase 0：書面確認

1. 向海洋保育署確認 MARN 開放資料可由第三方建立免費及付費 API，並確認建議顯名文字。
2. 對 OBIS／GBIF 選定少量資料集，保存實際授權與 citation。
3. 寫信詢問 OBIS-SEAMAP：CC BY／gridded summary 是否允許經由付費 API 再散布。
4. 若保護區或 Red List 是核心功能，向 UNEP-WCMC、MPAtlas、IUCN／IBAT 索取商業授權報價與 API 再散布條款。

### Phase 1：臺灣商業安全原型

只使用：

- MARN 鯨豚資料。
- 政府開放授權的海龜統計與海域水質。
- Khun-Sin 自建 taxonomy mapping 與品質欄位。

先證明使用者是否願意為標準化、版本、空間查詢或更新通知付費，不必先承擔全球授權複雜度。

### Phase 2：全球 open-license 擴充

- 從 OBIS／GBIF 只選 CC0、CC BY 資料集。
- 建立 dataset allowlist、去重規則及 attribution manifest。
- 不納入任何 NC、permission-required 或授權不明資料。

### Phase 3：商業授權資料

只有在客戶需求與收入足以支持授權成本時，再談 IUCN、Protected Planet、MPAtlas 或其他專有資料。每個來源獨立核算成本、限制與終止後資料處理方式。

## 八、Go／No-Go 判斷

### 可以立即做

- 用 MARN 與其他 OGDL-Taiwan-1.0 資料建立商業 API 原型。
- 設計逐資料集 license registry 與 attribution manifest。
- 將 OBIS／GBIF 視為候選 catalog，逐資料集審查後才 ingest。
- 以服務、品質、版本與可靠性作為收費價值。

### 尚不可做

- 將 OBIS 或 GBIF 全庫直接包裝成付費 API，而不過濾 CC BY-NC。
- 把 Protected Planet、IUCN 或 MPAtlas 資料放進可下載 API。
- 把非 CC0 的 OBIS-SEAMAP 下載資料再次散布。
- 對整個混合資料庫套用單一「Khun-Sin 專有授權」，抹除原始資料權利。
- 宣稱資料完整、即時或可代表真實發生率，而沒有調查努力量與缺口說明。

## 九、正式上線前必須取得的證據

- 每個生產資料集的授權快照或合約。
- 權利人、版本、下載日期與 citation。
- 商業使用、改作、快取、再散布及 sublicensing 的明確答案。
- 上游停止提供、撤回或授權變更時的處理方案。
- 敏感位置、個資與研究倫理審查結果。
- API 客戶條款中對上游授權、免責及禁止冒充背書的揭露。
- 法律顧問對實際付費方案、資料組合及司法管轄的審閱。

在上述證據完成前，研究文件中的「綠燈」只代表依目前公開條款具有初步可行性，不代表已完成正式法律核准。

