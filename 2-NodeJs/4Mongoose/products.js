const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
  .then(()=>{
    console.log('Connection Open!!!');
  })
  .catch(err=>{
    console.log(`Error Boi!: ${err}`);
  })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Prive must be positive!!'],
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0,
        },
        inStore: {
            type: Number,
            default: 0,
        }
    },
    size: {
        type: String,
        enum: {
            values: ['Small', 'Medium', 'Large'],
            message: 'Select one of these: "Small", "Medium", "Large"',
            },
        required: true
    }
})

productSchema.methods.greet = function () {
    console.log("Hi!!");
    console.log(`- from ${this.name}`); 
    console.log(`- from ${this.onSale}`); 
}

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale
    return this.save()
}

productSchema.methods.addCategory= function(category) {
    this.categories.push(category)
    return this.save()
}

productSchema.static('findByName', function(name) {
    return this.find({ name: name })
})

productSchema.methods.fireSale = function(discount) {
    this.price = this.price - (discount * this.price)/100 
    return this.save()
}

const Product = mongoose.model('Product',productSchema)

const findProduct = async (name, discount) => {
    const foundProduct = await Product.findByName(name)
    for(let product of foundProduct){
        await product.toggleOnSale()
        await product.addCategory(discount)
        await product.fireSale(discount)
    }
    console.log(foundProduct);
}

findProduct('Bike Helmet', 20)
