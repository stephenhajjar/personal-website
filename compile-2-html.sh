cd source/
echo "converting $1 from markdown to html"
pandoc -f markdown -t html5 -o $2 $1 -c styles.css

mv $2 ../build/

echo "outputted to build/$2"