import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Calendar as CalendarIcon, Search } from "lucide-react";
import { motion } from "motion/react";

interface LineItem {
  id: string;
  sku: string;
  description: string;
  conversion: string;
  qty: number;
  uom: string;
  pcsQty: number;
  expDate: string;
  batch: string;
  qtyAvailable: number;
  status: "Fulfilled" | "Not Fulfilled";
}

interface BatchOption {
  item: string;
  qty: number;
  batch: string;
  expDate: string;
}

const MOCK_BATCHES: BatchOption[] = [
  { item: "ABC RASA MANTAF", qty: 150, batch: "BCH-001", expDate: "2025-12-31" },
  { item: "ABC RASA MANTAF", qty: 85, batch: "BCH-002", expDate: "2025-11-15" },
  { item: "ABC RASA MANTAF", qty: 200, batch: "BCH-003", expDate: "2026-01-20" },
  { item: "ITEM LAIN", qty: 50, batch: "BCH-X99", expDate: "2025-06-30" },
];

export default function App() {
  const [reference, setReference] = useState("");
  const [sourceWarehouse, setSourceWarehouse] = useState("DC PULOGADUNG");
  const [destWarehouse, setDestWarehouse] = useState("WH PULOGEBANG");
  const [clientFrom, setClientFrom] = useState("SAPS");
  const [clientTo, setClientTo] = useState("SAPS_RT");
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [activeLineItemId, setActiveLineItemId] = useState<string | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "1",
      sku: "1000708",
      description: "ABC RASA MANTAF",
      conversion: "",
      qty: 10,
      uom: "Search UOM...",
      pcsQty: 0,
      expDate: "",
      batch: "",
      qtyAvailable: 0,
      status: "Not Fulfilled",
    },
  ]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      sku: "",
      description: "",
      conversion: "",
      qty: 0,
      uom: "",
      pcsQty: 0,
      expDate: "",
      batch: "",
      qtyAvailable: 0,
      status: "Not Fulfilled",
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleOpenBatchModal = (id: string) => {
    setActiveLineItemId(id);
    setIsBatchModalOpen(true);
  };

  const handleSelectBatch = (batch: BatchOption) => {
    if (activeLineItemId) {
      setLineItems(
        lineItems.map((item) =>
          item.id === activeLineItemId
            ? { ...item, batch: batch.batch, expDate: batch.expDate, qtyAvailable: batch.qty }
            : item
        )
      );
      setIsBatchModalOpen(false);
      setActiveLineItemId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50">
          <h1 className="text-2xl font-bold text-gray-800">Stock Transfer</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-medium">
              Save as Draft
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8">
              Submit
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Reference Section */}
          <div className="flex items-center gap-4 max-w-md">
            <Label htmlFor="reference" className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Reference <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reference"
              placeholder="Input here.."
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>

          {/* Warehouse & Client Section */}
          <div className="bg-[#f3f0ff] rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label className="text-sm font-semibold text-gray-700">Source Warehouse</Label>
              <Select value={sourceWarehouse} onValueChange={setSourceWarehouse}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DC PULOGADUNG">DC PULOGADUNG</SelectItem>
                  <SelectItem value="WH JAKARTA">WH JAKARTA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label className="text-sm font-semibold text-gray-700">Destination Warehouse</Label>
              <Select value={destWarehouse} onValueChange={setDestWarehouse}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WH PULOGEBANG">WH PULOGEBANG</SelectItem>
                  <SelectItem value="DC BEKASI">DC BEKASI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label className="text-sm font-semibold text-gray-700">Client From</Label>
              <Select value={clientFrom} onValueChange={setClientFrom}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SAPS">SAPS</SelectItem>
                  <SelectItem value="CLIENT_A">CLIENT_A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label className="text-sm font-semibold text-gray-700">Client To</Label>
              <Select value={clientTo} onValueChange={setClientTo}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SAPS_RT">SAPS_RT</SelectItem>
                  <SelectItem value="CLIENT_B">CLIENT_B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Section */}
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6">
                Recalculate
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[50px] text-xs font-bold text-gray-500 uppercase">No</TableHead>
                    <TableHead className="w-[180px] text-xs font-bold text-gray-500 uppercase">SKU SAMB</TableHead>
                    <TableHead className="min-w-[200px] text-xs font-bold text-gray-500 uppercase">SAMB Description</TableHead>
                    <TableHead className="w-[120px] text-xs font-bold text-gray-500 uppercase">Conversion</TableHead>
                    <TableHead className="w-[100px] text-xs font-bold text-gray-500 uppercase">Qty</TableHead>
                    <TableHead className="w-[150px] text-xs font-bold text-gray-500 uppercase">UoM</TableHead>
                    <TableHead className="w-[100px] text-xs font-bold text-gray-500 uppercase">Pcs Qty</TableHead>
                    <TableHead className="w-[180px] text-xs font-bold text-gray-500 uppercase">Exp. Date</TableHead>
                    <TableHead className="w-[150px] text-xs font-bold text-gray-500 uppercase">Batch</TableHead>
                    <TableHead className="w-[120px] text-xs font-bold text-gray-500 uppercase">Qty Available</TableHead>
                    <TableHead className="w-[140px] text-xs font-bold text-gray-500 uppercase">Inventory Status</TableHead>
                    <TableHead className="w-[80px] text-xs font-bold text-gray-500 uppercase text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lineItems.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-gray-50/30 transition-colors">
                      <TableCell className="font-medium text-gray-600">{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={item.sku}
                          onChange={(e) => updateLineItem(item.id, "sku", e.target.value)}
                          className="h-9 border-gray-200 focus:ring-1 focus:ring-blue-500"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.description}
                          readOnly
                          className="h-9 bg-gray-50 border-gray-200 text-gray-500"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Input here.."
                          value={item.conversion}
                          onChange={(e) => updateLineItem(item.id, "conversion", e.target.value)}
                          className="h-9 border-gray-200"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateLineItem(item.id, "qty", parseInt(e.target.value))}
                          className="h-9 border-gray-200"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Search UOM..."
                          value={item.uom}
                          onChange={(e) => updateLineItem(item.id, "uom", e.target.value)}
                          className="h-9 border-gray-200"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.pcsQty}
                          onChange={(e) => updateLineItem(item.id, "pcsQty", parseInt(e.target.value))}
                          className="h-9 border-gray-200"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            type="date"
                            value={item.expDate}
                            onChange={(e) => updateLineItem(item.id, "expDate", e.target.value)}
                            className="h-9 border-gray-200 pr-10 appearance-none"
                          />
                          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            placeholder="Select batch.."
                            value={item.batch}
                            readOnly
                            onClick={() => handleOpenBatchModal(item.id)}
                            className="h-9 border-gray-200 cursor-pointer focus:ring-1 focus:ring-blue-500 pr-10"
                          />
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.qtyAvailable}
                          readOnly
                          className="h-9 bg-gray-50 border-gray-200 text-gray-500"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status === "Fulfilled" ? "default" : "destructive"}
                          className="rounded-md px-3 py-1 font-medium whitespace-nowrap"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLineItem(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Button
              variant="outline"
              onClick={addLineItem}
              className="mt-2 text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Line Item
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Batch Selection Modal */}
      <Dialog open={isBatchModalOpen} onOpenChange={setIsBatchModalOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              Select Batch
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-xs font-bold text-gray-500 uppercase">Item</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 uppercase">Qty</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 uppercase">Batch</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 uppercase">Exp. Date</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 uppercase text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_BATCHES.map((batch, idx) => (
                  <TableRow key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <TableCell className="font-medium text-gray-700">{batch.item}</TableCell>
                    <TableCell className="text-gray-600">{batch.qty}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-mono">
                        {batch.batch}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{batch.expDate}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        onClick={() => handleSelectBatch(batch)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                      >
                        Pilih
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
