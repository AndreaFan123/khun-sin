# 全球海洋保育資料資源清單

最後查核：2026-10-13  
用途：作為 Khun-Sin 未來研究、資料管線、地圖與產品探索的來源登錄表；目前尚未接入網站或資料管線。

若要將這些來源整合成免費或付費 API，請先閱讀[海洋保育整合 API：授權與商業可行性研究](marine-conservation-api-licensing-and-commercialization.md)。

## 核心判斷

目前沒有一個成熟、統一且能同時涵蓋物種觀測、海洋保護區、棲地、保育狀態、污染、混獲、擱淺、救援與管理成效的全球海洋保育資料庫。可行做法是依問題組合多個資料層，並保留每筆資料的來源、授權、時間與語意。

對本專案最實用的分層是：

1. **臺灣事件層**：MARN／海洋保育署確認的擱淺、救援與通報資料。
2. **物種背景層**：OBIS、OBIS-SEAMAP；必要時以 GBIF 補充。
3. **保護區與棲地層**：Protected Planet、MPAtlas、GD-PAME、Ocean+ Data Viewer。
4. **保育狀態層**：IUCN Red List。

這些資料層只能互相補充，不能直接互相替代：

- 物種出現紀錄不等於擱淺事件。
- 保護區已劃設不等於已落實管理或產生保育成效。
- 全球資料覆蓋不等於各國、年份與物種的觀測強度一致。
- 聚合平台提供的欄位不一定保留原始擱淺資料中的生死、屍況、病理或死因。

## 建議優先使用的全球資源

### 1. Ocean Biodiversity Information System（OBIS）

- **入口**：[OBIS](https://obis.org/)
- **存取說明**：[Access OBIS data](https://obis.org/data/access/)
- **可取得內容**：整合自數千個資料集的海洋生物 occurrence／event records；常見欄位包含物種、時間、座標、深度、座標不確定性與品質旗標。
- **存取方式**：Mapper、搜尋介面、JSON API、R 套件，以及供大型分析使用的 AWS GeoParquet。
- **可能用途**：
  - 建立臺灣周邊鯨豚與海龜歷史出現背景。
  - 比較擱淺地點與既有物種分布紀錄。
  - 製作「觀測背景」圖層或物種清單。
- **限制**：紀錄來自不同調查方法與努力量；不能由點位密度直接推論族群數量。必須檢查個別資料集的授權與引用要求。
- **導入優先度**：高；先以小範圍、少數物種做探索性原型。

### 2. OBIS-SEAMAP

- **入口**：[OBIS-SEAMAP](https://seamap.env.duke.edu/)
- **可取得內容**：全球海洋哺乳類、海鳥、海龜、鯊魚與魟魚的調查、衛星追蹤、被動聲學、照片辨識及公民科學資料。
- **可能用途**：
  - 補強鯨豚與海龜的移動、分布及模型背景。
  - 探索擱淺事件與已知活動海域之間的空間關係。
  - 尋找適合進一步洽談的原始研究團隊或資料集。
- **限制**：不是全球擱淺事件庫；下載時須遵守各資料集授權與引用條件，部分下載流程要求填寫使用目的。
- **導入優先度**：研究用途高；若要經由 Khun-Sin API 再散布，只有明確 CC0 資料可直接納入，其他資料須先取得書面同意。

### 3. Protected Planet：WDPCA 與 GD-PAME

- **入口**：[Protected Planet](https://www.protectedplanet.net/)
- **API**：[Protected Planet API](https://api.protectedplanet.net/)
- **管理成效**：[Protected and Conserved Area Effectiveness（GD-PAME）](https://www.protectedplanet.net/en/thematic-areas/protected-areas-management-effectiveness-pame)
- **可取得內容**：各國通報的保護區與 OECM 邊界、治理與管理屬性；GD-PAME 收錄管理成效評估。
- **目前版本注意**：WDPA 與 WD-OECM 已於 2025-11-01 合併為 World Database on Protected and Conserved Areas（WDPCA）；舊版 v3 API 已於 2026-05-01 下線，新的整合應使用 v4。
- **可能用途**：
  - 判斷臺灣或跨國事件是否位於、鄰近或遠離保護區及 OECM。
  - 比較法定保護範圍與物種觀測、擱淺事件的空間關係。
  - 將「是否劃設」與「是否已有管理成效評估」分開呈現。
- **限制與授權**：資料與 API 不得直接假設可商業使用；目前條款限制商業使用與資料再散布，發布時要求標明資料版本、來源及連回 Protected Planet。正式接入前必須重新審查[使用條款](https://www.protectedplanet.net/en/legal)。
- **導入優先度**：中高；適合研究原型，但公開產品的授權與再散布方式要先確認。

### 4. Marine Protection Atlas（MPAtlas）

- **入口**：[MPAtlas](https://mpatlas.org/)
- **方法**：[Marine Protection Atlas Methodology](https://mpatlas.org/methods/)
- **可取得內容**：以 WDPCA 為基礎，再依科學框架獨立判定海洋保護區的設立階段與保護強度。
- **可能用途**：
  - 避免只用法定面積判斷保育成果。
  - 區分 proposed、committed、designated 與 implemented 等狀態。
  - 比較名義保護區與 fully／highly protected 區域。
- **限制**：它是對海洋保護區的專門評估，不是物種或事件資料庫；其統計可能因分類方法而與 WDPCA 不同。
- **導入優先度**：中；適合用來解釋保護區「品質」，不宜取代法定來源。

### 5. Ocean+ Data Viewer

- **入口**：[UNEP-WCMC Ocean+ Data Viewer](https://resources.unep-wcmc.org/products/WCMC_PT006)
- **目前狀態**：原 Ocean+ Data Viewer 已退役；資源頁與部分原始資料仍可供查找，官方目前引導使用者轉向其他平台。
- **可取得內容**：過去彙整珊瑚礁、紅樹林、海草床等全球沿岸與海洋生物多樣性 GIS 圖層。
- **可能用途**：
  - 為擱淺與物種觀測加入重要棲地脈絡。
  - 支援海洋空間規劃、棲地地圖與生態系分析。
  - 找出適合後續研究的原始全球棲地資料集。
- **限制**：這是多來源空間圖層集合，不是即時事件庫，也沒有平台級的統一商業授權；每個圖層的原始發布者、年代、解析度、再散布權與條款均須個別確認。
- **導入優先度**：中；待專案有明確棲地問題後再選圖層，不先整包匯入。

### 6. IUCN Red List

- **入口**：[IUCN Red List](https://www.iucnredlist.org/)
- **空間資料**：[Spatial data download](https://www.iucnredlist.org/resources/spatial-data-download)
- **可取得內容**：全球物種受威脅等級、評估資訊，以及部分類群的分布範圍。
- **可能用途**：
  - 在物種頁及事件頁補充保育等級與評估日期。
  - 依受威脅程度提供篩選或敘事脈絡。
  - 與 MARN 事件資料建立物種層級關聯。
- **限制**：不是即時事件資料；空間資料並未完整涵蓋所有海洋類群。授權與商業使用限制必須於接入前重新確認。
- **導入優先度**：非商業研究用途高，但不能直接納入付費 API；商業用途須另取得 IUCN／IBAT 授權。研究時先以物種狀態與評估日期為主，不以不完整的範圍圖推論不存在。

### 7. Global Biodiversity Information Facility（GBIF）

- **入口**：[GBIF](https://www.gbif.org/)
- **API 文件**：[GBIF API Reference](https://techdocs.gbif.org/en/openapi/)
- **可取得內容**：全球生物多樣性 occurrence records、物種名稱服務、地圖及資料集索引；部分國家與機構會發布海洋擱淺資料集。
- **存取方式**：REST API、即時搜尋及非同步批次下載；大量查詢應使用 download API，以保留引用與減少限流問題。
- **可能用途**：
  - 尋找 OBIS 未收錄或較容易下載的機構級資料集。
  - 尋找特定國家的歷史擱淺資料發布者。
  - 進行物種名稱對照與資料集發現。
- **限制**：GBIF 不是海洋專用，也不是統一擱淺庫。資料轉為 occurrence records 後，可能遺失生死、屍況、病理、救援結果與死因等欄位。
- **導入優先度**：中；作為資料發現與補充來源，不作為臺灣擱淺事件的事實主庫。

## 擱淺資料：目前仍存在的全球缺口

### IWC Strandings Initiative

- **入口**：[IWC Strandings Initiative](https://iwc.int/management-and-conservation/strandings/strandings-initiative)
- **目前狀態**：IWC 提供全球專家支援、訓練、資料彙整與標準，但其全球擱淺資料庫仍是規劃中項目，且官方說明為早期階段。現行方向是先與 ASCOBANS、ICES 發展區域資料庫提案，再逐步擴展成全球資源。
- **專案判斷**：列入觀察名單，不納入近期資料管線。未來應追蹤資料模型、開放方式、授權、識別碼與 API 是否正式確立。

### MEDACES

- **入口**：[ACCOBAMS Strandings／MEDACES](https://accobams.org/conservations-action/strandings/)
- **涵蓋範圍**：地中海、黑海及相鄰大西洋水域的區域性鯨豚擱淺資料庫。
- **專案判斷**：可作為區域治理及資料標準案例，但不是全球資料庫。公開下載、欄位與授權模式在實際採用前仍需逐項確認。

更完整的逐國可取得性與欄位缺口，見[跨國擱淺資料可取得性研究](stranding-data-availability.md)。

## 未來可驗證的使用情境

以下只是候選實驗，尚未代表已決定的產品功能：

| 問題 | 主資料 | 補充資料 | 最小可行驗證 |
|---|---|---|---|
| 某物種是否曾在臺灣周邊被觀測？ | OBIS／OBIS-SEAMAP | GBIF | 選 1 個物種、臺灣 EEZ 周邊與固定年份，檢查欄位與授權 |
| 擱淺位置是否鄰近保護區？ | MARN | WDPCA／MPAtlas | 使用去識別或降精度位置做 point-in-polygon，不公開敏感座標 |
| 事件周邊有哪些重要棲地？ | MARN | Ocean+ Data Viewer | 選 1 種棲地圖層，先檢查解析度與時間是否適合 |
| 事件物種的保育風險為何？ | MARN 物種欄位 | IUCN Red List | 以學名匹配評估結果，保留評估日期與版本 |
| 國際資料是否能補足臺灣趨勢？ | MARN | OBIS／GBIF | 僅比較資料覆蓋與欄位，不直接合併事件數或推論發生率 |

## 接入前檢查清單

任何來源進入正式資料管線前，都應記錄：

- 來源機構、資料集名稱、穩定識別碼與原始連結。
- 下載或查詢日期、資料版本及 API 版本。
- 資料授權、引用文字、商業使用與再散布限制。
- 原始資料集與聚合平台的關係，避免重複計數。
- 時間範圍、空間解析度、座標系統與座標不確定性。
- 調查方法、努力量、缺值、品質旗標與資料更新頻率。
- 是否含敏感物種、救援現場、個人資料或精確位置。
- 能回答與不能回答的問題，以及禁止進行的推論。

若資料被用於公開網站，應把來源版本與引用保留在產出中，而不是只留在開發文件。

## 維護方式

- 每次實際評估或接入一個來源時，更新「最後查核」、存取方式、授權及專案判斷。
- API、使用條款及資料庫名稱可能改變；實作前重新查核官方文件，不以本清單取代當下的條款審查。
- 對尚未公開或需申請的來源，只記錄取得流程，不把「存在資料庫」寫成「資料可公開使用」。
- 新來源應先回答一個明確研究問題，再決定是否納入，避免建立沒有用途的全球資料鏡像。
