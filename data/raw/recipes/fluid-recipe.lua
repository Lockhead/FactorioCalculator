

data:extend(
{
  {
    type = "recipe",
    name = "basic-oil-processing",
    category = "oil-processing",
    enabled = false,
    energy_required = 5,
    ingredients =
    {
      {type="fluid", name="crude-oil", amount=100}
    },
    results=
    {
      {type="fluid", name="heavy-oil", amount=30},
      {type="fluid", name="light-oil", amount=30},
      {type="fluid", name="petroleum-gas", amount=40}
    },
    icon = "__base__/graphics/icons/fluid/basic-oil-processing.png",
    subgroup = "fluid-recipes",
    order = "a[oil-processing]-a[basic-oil-processing]"
  },

  {
    type = "recipe",
    name = "advanced-oil-processing",
    category = "oil-processing",
    enabled = false,
    energy_required = 5,
    ingredients =
    {
      {type="fluid", name="water", amount=50},
      {type="fluid", name="crude-oil", amount=100}
    },
    results=
    {
      {type="fluid", name="heavy-oil", amount=10},
      {type="fluid", name="light-oil", amount=45},
      {type="fluid", name="petroleum-gas", amount=55}
    },
    icon = "__base__/graphics/icons/fluid/advanced-oil-processing.png",
    subgroup = "fluid-recipes",
    order = "a[oil-processing]-b[advanced-oil-processing]"
  },

  {
    type = "recipe",
    name = "coal-liquefaction",
    category = "oil-processing",
    enabled = false,
    energy_required = 5,
    ingredients =
    {
      {type="item", name="coal", amount=10},
      {type="fluid", name="heavy-oil", amount=25},
      {type="fluid", name="steam", amount=50}
    },
    results=
    {
      {type="fluid", name="heavy-oil", amount=35},
      {type="fluid", name="light-oil", amount=15},
      {type="fluid", name="petroleum-gas", amount=20}
    },
    icon = "__base__/graphics/icons/fluid/coal-liquefaction.png",
    subgroup = "fluid-recipes",
    order = "a[oil-processing]-c[coal-liquefaction]",
    allow_decomposition = false
  },

  {
    type = "recipe",
    name = "heavy-oil-cracking",
    category = "chemistry",
    enabled = false,
    energy_required = 3,
    ingredients =
    {
      {type="fluid", name="water", amount=30},
      {type="fluid", name="heavy-oil", amount=40}
    },
    results=
    {
      {type="fluid", name="light-oil", amount=30}
    },
    main_product= "",
    icon = "__base__/graphics/icons/fluid/heavy-oil-cracking.png",
    subgroup = "fluid-recipes",
    order = "b[fluid-chemistry]-a[heavy-oil-cracking]"
  },

  {
    type = "recipe",
    name = "light-oil-cracking",
    category = "chemistry",
    enabled = false,
    energy_required = 3,
    ingredients =
    {
      {type="fluid", name="water", amount=30},
      {type="fluid", name="light-oil", amount=30}
    },
    results=
    {
      {type="fluid", name="petroleum-gas", amount=20}
    },
    main_product= "",
    icon = "__base__/graphics/icons/fluid/light-oil-cracking.png",
    subgroup = "fluid-recipes",
    order = "b[fluid-chemistry]-b[light-oil-cracking]"
  },

  {
    type = "recipe",
    name = "sulfuric-acid",
    category = "chemistry",
    energy_required = 1,
    enabled = false,
    ingredients =
    {
      {type="item", name="sulfur", amount=5},
      {type="item", name="iron-plate", amount=1},
      {type="fluid", name="water", amount=100}
    },
    results=
    {
      {type="fluid", name="sulfuric-acid", amount=50}
    },
    subgroup = "fluid-recipes"
  },

  {
    type = "recipe",
    name = "plastic-bar",
    category = "chemistry",
    energy_required = 1,
    enabled = false,
    ingredients =
    {
      {type="fluid", name="petroleum-gas", amount=20},
      {type="item", name="coal", amount=1}
    },
    results=
    {
      {type="item", name="plastic-bar", amount=2}
    }
  },

  {
    type = "recipe",
    name = "solid-fuel-from-light-oil",
    category = "chemistry",
    energy_required = 3,
    ingredients =
    {
      {type="fluid", name="light-oil", amount=10}
    },
    results=
    {
      {type="item", name="solid-fuel", amount=1}
    },
    icon = "__base__/graphics/icons/solid-fuel-from-light-oil.png",
    subgroup = "fluid-recipes",
    enabled = false,
    order = "b[fluid-chemistry]-c[solid-fuel-from-light-oil]"
  },

  {
    type = "recipe",
    name = "solid-fuel-from-petroleum-gas",
    category = "chemistry",
    energy_required = 3,
    ingredients =
    {
      {type="fluid", name="petroleum-gas", amount=20}
    },
    results=
    {
      {type="item", name="solid-fuel", amount=1}
    },
    icon = "__base__/graphics/icons/solid-fuel-from-petroleum-gas.png",
    subgroup = "fluid-recipes",
    enabled = false,
    order = "b[fluid-chemistry]-d[solid-fuel-from-petroleum-gas]"
  },

  {
    type = "recipe",
    name = "solid-fuel-from-heavy-oil",
    category = "chemistry",
    energy_required = 3,
    ingredients =
    {
      {type="fluid", name="heavy-oil", amount=20}
    },
    results=
    {
      {type="item", name="solid-fuel", amount=1}
    },
    icon = "__base__/graphics/icons/solid-fuel-from-heavy-oil.png",
    subgroup = "fluid-recipes",
    enabled = false,
    order = "b[fluid-chemistry]-e[solid-fuel-from-heavy-oil]"
  },


  {
    type = "recipe",
    name = "sulfur",
    category = "chemistry",
    energy_required = 1,
    enabled = false,
    ingredients =
    {
      {type="fluid", name="water", amount=30},
      {type="fluid", name="petroleum-gas", amount=30}
    },
    results=
    {
      {type="item", name="sulfur", amount=2}
    }
  },

  {
    type = "recipe",
    name = "lubricant",
    category = "chemistry",
    enabled = false,
    energy_required = 1,
    ingredients =
    {
      {type="fluid", name="heavy-oil", amount=10}
    },
    results=
    {
      {type="fluid", name="lubricant", amount=10}
    },
    subgroup = "fluid-recipes"
  },

  {
    type = "recipe",
    name = "empty-barrel",
    category = "crafting",
    energy_required = 1,
    subgroup = "intermediate-product",
    enabled = false,
    ingredients =
    {
      {type="item", name="steel-plate", amount=1},
    },
    results=
    {
      {type="item", name="empty-barrel", amount=1}
    },
  }
})
