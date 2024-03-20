import { NextResponse, type NextRequest } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

/* GET PRODUCT RECORD */
export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();

  if (!products)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(products);
}

/* ADD PRODUCT RECORD */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  /* check if there is existing product name */
  const product = await prisma.product.findUnique({
    where: { name: body.name },
  });
  if (product)
    return NextResponse.json(
      { error: "Product already exist" },
      { status: 400 }
    );

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(newProduct, { status: 201 });
}

/* UPDATE PRODUCT RECORD */
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  /* check if there is existing product name */
  const product = await prisma.product.findUnique({
    where: { name: body.name },
  });

  if (!product)
    return NextResponse.json(
      { error: "Product not found beshy" },
      { status: 404 }
    );

  const updatedproduct = await prisma.product.update({
    where: { name: body.name },
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(updatedproduct, { status: 201 });
}

/* DELETE PRODUCT RECORD */
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const product = await prisma.product.findUnique({
    where: { name: body.name },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  await prisma.product.delete({
    where: { name: product.name },
  });

  return NextResponse.json(
    { body: "Removed Product " + product.name },
    { status: 410 }
  );
}
