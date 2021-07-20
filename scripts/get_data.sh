
echo "import db_2002"
wget --no-check-certificate -qO db_2002.json "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2002"
mongoimport --db test --collection 2002 --drop --file db_2002.json --jsonArray


echo "import db_2002"
wget --no-check-certificate -qO db_2001.json "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2001"
mongoimport --db test --collection 2001 --drop --file db_2001.json --jsonArray
rm db_2001.json db_2002.json