const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: __dirname + '/../../.env' }); // Load .env from root

const PRODUCTS = [
  { name:'Fresh Red Tomatoes', name_hi:'ताज़ा लाल टमाटर', category:'fruits-veg', price:40, originalPrice:50, unit:'1 kg', unit_hi:'1 किलो', image:'https://m.media-amazon.com/images/I/61cGwZx-uqL._AC_UF894,1000_QL80_.jpg', description:'Farm-fresh, juicy red tomatoes. Handpicked and packed under hygienic conditions. Perfect for curries, salads, and soups.', description_hi:'खेत से ताज़ा, रसीले लाल टमाटर।', rating:4.5, inStock:true, tag:'Fresh', tag_hi:'ताज़ा' },
  { name:'Fresh Potatoes (Aloo)', name_hi:'ताज़ा आलू (Aloo)', category:'fruits-veg', price:30, originalPrice:35, unit:'1 kg', unit_hi:'1 किलो', image:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60', description:'Premium quality potatoes, rich in carbohydrates.', description_hi:'कार्बोहाइड्रेट से भरपूर प्रीमियम गुणवत्ता वाले आलू।', rating:4.6, inStock:true, tag:'Staple', tag_hi:'रोज़ाना' },
  { name:'Fresh Green Coriander (Dhania)', name_hi:'ताज़ा हरा धनिया (Dhania)', category:'fruits-veg', price:15, originalPrice:20, unit:'1 Bunch', unit_hi:'1 गुच्छा', image:'https://5.imimg.com/data5/SELLER/Default/2022/2/KM/XH/CG/147317048/fresh-green-coriander-leaf.jpg', description:'Fresh aromatic green coriander leaves.', description_hi:'ताज़ा खुशबूदार हरी धनिया की पत्तियाँ।', rating:4.8, inStock:true, tag:'Organic', tag_hi:'ऑर्गेनिक' },
  { name:'Bananas (Kela)', name_hi:'ताज़ा पके केले (Kela)', category:'fruits-veg', price:50, originalPrice:60, unit:'1 Dozen', unit_hi:'1 दर्जन', image:'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60', description:'Sweet and perfectly ripe yellow bananas.', description_hi:'मीठे और पूरी तरह से पके पीले केले।', rating:4.4, inStock:true, tag:'High Energy', tag_hi:'ताज़गी' },
  { name:'Amul Taaza Toned Milk', name_hi:'अमूल ताज़ा टोंड दूध', category:'dairy', price:27, originalPrice:27, unit:'500 ml', unit_hi:'500 मिली', image:'https://www.bbassets.com/media/uploads/p/l/306926_4-amul-homogenised-toned-milk.jpg', description:'Homogenized toned milk from Amul.', description_hi:'अमूल का होमोजिनाइज्ड टोंड दूध।', rating:4.9, inStock:true, tag:'Popular', tag_hi:'लोकप्रिय' },
  { name:'Amul Salted Butter', name_hi:'अमूल साल्टेड बटर (मक्खन)', category:'dairy', price:56, originalPrice:58, unit:'100 g', unit_hi:'100 ग्राम', image:'https://m.media-amazon.com/images/I/717GgfVk6YL.jpg', description:'Classic salted butter from Amul.', description_hi:'अमूल का क्लासिक नमकीन मक्खन।', rating:4.9, inStock:true, tag:'Daily Essential', tag_hi:'ज़रूरी' },
  { name:'Fresh Paneer (Cottage Cheese)', name_hi:'ताज़ा पनीर (Paneer)', category:'dairy', price:90, originalPrice:100, unit:'200 g', unit_hi:'200 ग्राम', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgfMxMfkgsyeRsjx4vJwHhGqkGlZTak90ozxHVqH9cJorrM8JJJSY7hAa&s=10', description:'Soft, rich, and creamy fresh cottage cheese.', description_hi:'नरम, मलाईदार ताज़ा पनीर।', rating:4.7, inStock:true, tag:'Fresh', tag_hi:'ताज़ा' },
  { name:'Amul Cheese', name_hi:'अमूल चीज़', category:'dairy', price:300, originalPrice:300, unit:'500 gm', unit_hi:'500 ग्राम', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5WgWHqYpLvzXXmivk4DN0unI2KplqPxDOVwHcyNWGmQ&s=10', description:'Amul Pure Milk Cheese Block.', description_hi:'अमूल प्योर मिल्क चीज़ ब्लॉक।', rating:4.9, inStock:true, tag:'Popular', tag_hi:'लोकप्रिय' },
  { name:'Britannia 100% Whole Wheat Bread', name_hi:'ब्रिटानिया प्योर होल व्हीट ब्रेड', category:'dairy', price:50, originalPrice:50, unit:'450 gm', unit_hi:'450 ग्राम', image:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRZx8Tk95TukzPwArnd-bF6dslHQOaHUndTua-DaB03MG406c1vB-x_eUFOr8QpWGkkp2S0PC_hoTpmKTH4e-enXiCcKWNhj1B-LQXQXTBGPdLGbRjpYuH5Jw', description:'Made from whole wheat flour, rich in dietary fiber.', description_hi:'साबुत गेहूं के आटे से बना।', rating:4.8, inStock:true, tag:'No Maida', tag_hi:'मैदा रहित' },
  { name:'Aashirvaad Shudh Chakki Atta', name_hi:'आशीर्वाद शुद्ध चक्की आटा', category:'staples', price:245, originalPrice:280, unit:'5 kg', unit_hi:'5 किलो', image:'https://m.media-amazon.com/images/I/51LCvDHrbfL._AC_UF894,1000_QL80_.jpg', description:'100% pure whole wheat flour milled in traditional chakki process.', description_hi:'पारंपरिक चक्की प्रक्रिया में पिसा हुआ 100% शुद्ध साबुत गेहूं का आटा।', rating:4.8, inStock:true, tag:'Best Seller', tag_hi:'सबसे ज़्यादा बिकने वाला' },
  { name:'India Gate Basmati Rice (Premium)', name_hi:'इण्डिया गेट बासमती चावल (प्रीमियम)', category:'staples', price:110, originalPrice:130, unit:'1 kg', unit_hi:'1 किलो', image:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60', description:'Aged long-grain basmati rice.', description_hi:'पुराने लंबे दाने वाले बासमती चावल।', rating:4.7, inStock:true, tag:'Aged Grain', tag_hi:'पुराना बासमती' },
  { name:'Tata Sampann Toor / Arhar Dal', name_hi:'टाटा संपन्न तूर / अरहर दाल', category:'staples', price:165, originalPrice:185, unit:'1 kg', unit_hi:'1 किलो', image:'https://m.media-amazon.com/images/I/71iBPhVAfkL._AC_UF1000,1000_QL80_.jpg', description:'Unpolished toor dal rich in natural protein.', description_hi:'प्राकृतिक प्रोटीन से भरपूर बिना पॉलिश की हुई अरहर दाल।', rating:4.6, inStock:true, tag:'Unpolished', tag_hi:'बिना पॉलिश' },
  { name:'Sattu Flour', name_hi:'सत्तू का आटा', category:'staples', price:88, originalPrice:110, unit:'450 g', unit_hi:'450 ग्राम', image:'https://cdn.zeptonow.com/production/ik-seo/tr:w-470,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0bcb4dca-8719-4e05-9a69-1293a2cf8f1a/Let-s-Try-Sattu-No-Preservatives-Absolutely-Pure-Healthy.jpeg', description:'Making Health Drinks, and Preparing Snacks.', description_hi:'स्वास्थ्य पेय और नाश्ता बनाने के लिए।', rating:4.3, inStock:true, tag:'Preservative-free', tag_hi:'परिरक्षक रहित' },
  { name:'Britannia Marie Gold Biscuits', name_hi:'ब्रिटानिया मैरी गोल्ड बिस्कुट', category:'snacks', price:35, originalPrice:40, unit:'250 g', unit_hi:'250 ग्राम', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9GgOO2QSK4fUuOUcMfsJJZDD40crPMJNJG9j6gme3p8REeaSbyJ5mdBQ&s=10', description:'Light and crispy tea-time biscuits.', description_hi:'विटामिन और खनिजों से भरपूर हल्का और कुरकुरा बिस्कुट।', rating:4.5, inStock:true, tag:'Tea Partner', tag_hi:'चाय साथी' },
  { name:"Haldiram's Aloo Bhujia", name_hi:'हल्दीराम आलू भुजिया', category:'snacks', price:50, originalPrice:55, unit:'150 g', unit_hi:'150 ग्राम', image:'https://www.bbassets.com/media/uploads/p/l/70000834_6-haldirams-namkeen-aloo-bhujia-del.jpg', description:'A spicy, crispy potato noodle snack.', description_hi:'पुदीने और मसालों से तैयार एक तीखा, कुरकुरा आलू भुजिया।', rating:4.7, inStock:true, tag:'Crispy', tag_hi:'कुरकुरा' },
  { name:'Cadbury Dairy Milk Silk', name_hi:'कैडबरी डेयरी मिल्क सिल्क', category:'snacks', price:80, originalPrice:80, unit:'60 g', unit_hi:'60 ग्राम', image:'https://www.dialabouquet.in/wp-content/uploads/2014/08/Cadbury-silk.jpg', description:'Rich, smooth, and creamy milk chocolate.', description_hi:'समृद्ध, चिकनी और मलाईदार मिल्क चॉकलेट।', rating:4.8, inStock:true, tag:'Sweet Treat', tag_hi:'मिठाई' },
  { name:'Britannia Gobbles Choco Cake', name_hi:'ब्रिटानिया गोबल्स चोको केक', category:'snacks', price:22, originalPrice:22, unit:'120 g', unit_hi:'120 ग्राम', image:'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ7iMa7XlF9htD0pXhnCIriO6fBIU-yhSssAr_OPJAaSOj6zyuVbtl5bEx6A-f_Makflo2tNxI9WCyVVYg2gZKdopmlP00oBLiVif-2ZcoyOy5tCANTWdNf8w8', description:'Soft, fluffy texture, rich chocolate flavor.', description_hi:'नरम, मुलायम बनावट, भरपूर चॉकलेट का स्वाद।', rating:4.4, inStock:true, tag:'Sweet Treat', tag_hi:'मिठाई' },
  { name:'Tata Tea Gold', name_hi:'टाटा टी गोल्ड (चाय पत्ती)', category:'beverages', price:140, originalPrice:155, unit:'250 g', unit_hi:'250 ग्राम', image:'https://m.media-amazon.com/images/I/61L6hooC+ZL._AC_UF894,1000_QL80_.jpg', description:'A unique blend of fine Assam tea leaves.', description_hi:'बेहतरीन असम चाय की पत्तियों का एक अनूठा मिश्रण।', rating:4.7, inStock:true, tag:'Classic', tag_hi:'कड़क' },
  { name:'Nescafe Classic Coffee', name_hi:'नेस्कैफे क्लासिक कॉफ़ी', category:'beverages', price:185, originalPrice:195, unit:'50 g', unit_hi:'50 ग्राम', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrv7bPo34kCo8-6NN4izinCdN7Npei6jbvTlmw0z4CZ2Gxktm9KwUsBc&s=10', description:'100% pure instant coffee powder.', description_hi:'100% शुद्ध इंस्टेंट कॉफी पाउडर।', rating:4.8, inStock:true, tag:'Instant Brew', tag_hi:'ताज़ा कॉफ़ी' },
  { name:'Coca-Cola Soft Drink', name_hi:'कोका-कोला कोल्ड ड्रिंक', category:'beverages', price:40, originalPrice:40, unit:'750 ml', unit_hi:'750 मिली', image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60', description:'Refreshing carbonated cola beverage.', description_hi:'ताज़ा, बुलबुलेदार और मीठा कोला कोल्ड ड्रिंक।', rating:4.3, inStock:true, tag:'Chilled', tag_hi:'ठंडा' },
  { name:'Mountain Dew Soft Drink', name_hi:'माउंटेन ड्यू कोल्ड ड्रिंक', category:'beverages', price:33, originalPrice:35, unit:'250 ml', unit_hi:'250 मिली', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWpfxl9pVctK8OJrHURX6oGjKCWs8ge4-6NP17-0QoA&s=10', description:'Edgy citrus taste, caffeinated energy boost.', description_hi:'ज़बरदस्त सिट्रस स्वाद और कैफ़ीन से मिलने वाली एनर्जी।', rating:4.6, inStock:true, tag:'Chilled', tag_hi:'ठंडा' },
  { name:'Vim Dishwash Liquid Gel', name_hi:'विम डिशवॉश लिक्विड जेल', category:'household', price:99, originalPrice:110, unit:'500 ml', unit_hi:'500 मिली', image:'https://m.media-amazon.com/images/I/61-4eJ-pn0L.jpg', description:'Power of 100 lemons. Cuts grease easily.', description_hi:'100 नींबू की शक्ति। बर्तनों से चिकनाई को आसानी से हटाता है।', rating:4.7, inStock:true, tag:'Best Cleaning', tag_hi:'सुपर क्लीन' },
  { name:'Surf Excel Easy Wash Detergent', name_hi:'सर्फ एक्सेल इजी वॉश पाउडर', category:'household', price:135, originalPrice:145, unit:'1 kg', unit_hi:'1 किलो', image:'https://m.media-amazon.com/images/I/619HRPW3elL._AC_UF1000,1000_QL80_.jpg', description:'Premium laundry powder to remove tough stains.', description_hi:'जिद्दी दागों को हटाने के लिए प्रीमियम वाशिंग पाउडर।', rating:4.6, inStock:true, tag:'Stain Remover', tag_hi:'दागों की छुट्टी' },
  { name:'Dettol Liquid Handwash', name_hi:'डेटॉल लिक्विड हैंडवॉश (रिफिल)', category:'household', price:95, originalPrice:99, unit:'200 ml Refill', unit_hi:'200 मिली रिफिल', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhyjKBGEli5skswfjP2rA95qVGDYrl9YJIqxGawwcHdADflTGxFqMEiws&s=10', description:'Trusted 99.9% germ protection formula.', description_hi:'99.9% कीटाणु सुरक्षा फॉर्मूला।', rating:4.8, inStock:true, tag:'Antiseptic', tag_hi:'सुरक्षित हाथ' },
  { name:'Bajaj Almond Hair Oil', name_hi:'बजाज आल्मंड हेयर ऑयल', category:'household', price:136, originalPrice:142, unit:'190 ml', unit_hi:'190 मिली', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIDnEfureDydAbjN4Jitljid1Qm4z9CqmSKIgvB9616w&s=10', description:'Applied for Hair Growth, Anti-hair Fall, Healthy Scalp.', description_hi:'बालों का बढ़ना, बालों का झड़ना रोकना, स्कैल्प को स्वस्थ रखना।', rating:5.0, inStock:true, tag:'Non-Sticky', tag_hi:'चिपचिपा न होने वाला प्रोडक्ट' },
  { name:'Colgate Tooth Paste', name_hi:'कोलगेट स्ट्रॉन्ग टीथ', category:'household', price:250, originalPrice:305, unit:'500 g', unit_hi:'500 ग्राम', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3BH5HlwFZmuwfSaIn4bUm-es4bTEAI1WPdxspttORxQ&s=10', description:'Calcium-boost Tooth Paste for 2X Stronger Teeth.', description_hi:'कैल्शियम युक्त टूथपेस्ट जो दांतों को दोगुना मजबूत बनाता है।', rating:4.4, inStock:true, tag:'Non-Sticky', tag_hi:'चिपचिपा न होने वाला प्रोडक्ट' }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/apnabazar';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding...');

    // Upsert Owner
    const ownerPhone = '9125782767';
    let owner = await User.findOne({ phone: ownerPhone });
    if (!owner) {
        owner = new User({
            name: 'Shivansh Dubey',
            phone: ownerPhone,
            email: 'owner@apnabazar.com',
            passwordHash: process.env.OWNER_PASSWORD || 'ApnaBazar@123',
            role: 'owner'
        });
        await owner.save();
        console.log('Owner created!');
    } else {
        console.log('Owner already exists!');
    }

    // Upsert Products based on name
    for (const productData of PRODUCTS) {
        await Product.findOneAndUpdate(
            { name: productData.name },
            productData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }
    console.log(`Seeded/Upserted ${PRODUCTS.length} products.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
